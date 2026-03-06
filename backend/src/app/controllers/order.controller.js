import Order from '../models/order.modal.js'; // Kiểm tra lại tên file là model hay modal nhé
import generateOrderId from '../../utils/generateOrderId.js';
import mongoose from 'mongoose';
import Product from '../models/products.model.js';
import nodemailer from 'nodemailer';



export const sendMailInternal = async (userEmail, orderInfo) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `[Confirmation] Order #${orderInfo.orderId} successfully`,
      html: `
        <h3>Hello ${orderInfo.fullName},</h3>
        <p>Thank you for your order!</p>
        <p>Your order <b>#${orderInfo.orderId}</b> has been successfully received.</p>
        <p><b>Total :</b> ${Number(orderInfo.totalPrice).toLocaleString()} VND</p>
        <p><b>Shipping address:</b> ${orderInfo.address}</p>
        <br/>
        <p>We will process your order shortly.</p>
        <p>Thank you for shopping with us!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${userEmail} `);
  } catch (error) {
    console.error("EMAIL SENDING ERROR: ", error.message);
  }
};

// ------------- [TẠO ĐƠN HÀNG] ------------- 
export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { orderItems, shippingInfo, paymentMethod, totalPrice, userId } = req.body;

    //  Kiểm tra giỏ hàng
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty. Unable to create the order.' });
    }

    //  Kiểm tra thông tin giao hàng 
    const { fullName, email, phone, address } = shippingInfo || {};
    if (!fullName || !email || !phone || !address) {
      return res.status(400).json({ 
        message: 'Please provide complete shipping information (Full Name, Email, Phone Number, Address).' 
      });
    }

    for (const item of orderItems) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error(`Product not found. (ID: ${item.product})`);
      }

      // Kiểm tra nếu mảng variants hoàn toàn rỗng (lỗi dữ liệu database)
      if (!product.variants || product.variants.length === 0) {
        throw new Error(`Product "${product.name}" is misconfigured: no inventory data found (variants are empty).`);
      }

      let variantIndex = -1;

      // TRƯỜNG HỢP 1: Có chọn màu (Ví dụ: Máy pha cà phê)
      if (item.color) {
        variantIndex = product.variants.findIndex(v => v.color === item.color);
        if (variantIndex === -1) {
          throw new Error(`Product "${product.name}" has no color variants..`);
        }
      } 
      // TRƯỜNG HỢP 2: Không chọn màu
      else {
        if (product.variants.length === 1) {
          variantIndex = 0;
        } else {
          // Sản phẩm có nhiều màu nhưng Frontend lại không gửi màu nào lên
          throw new Error(`Product "${product.name}" has multiple color options. Please select a color.`);
        }
      }

      // Xử lý trừ kho dựa trên variant đã tìm được
      const selectedVariant = product.variants[variantIndex];
      
      if (selectedVariant.stock < item.quantity) {
        return res.status(400).json({
          message: "Quantity exceeds available stock.",
          maxAllowed: selectedVariant.stock
        });
      }

      // Trừ số lượng kho của đúng variant đó
      await Product.updateOne(
        { _id: product._id },
        { $inc: { [`variants.${variantIndex}.stock`]: -item.quantity } },
        { session }
      );
    }
const orderId = generateOrderId();
    //  Tạo instance mới từ Model
    const order = new Order({
      orderId: orderId, 
      user: userId || null,       
      shippingInfo: {
        fullName,
        email,
        phone,
        address,
        note: shippingInfo.note || "" 
      },
      orderItems,
      paymentMethod,
      totalPrice: Number(totalPrice),
    }); 

    const createdOrder = await order.save({ session });

    //  Nếu success thì commit
    await session.commitTransaction();
    session.endSession();

    await sendMailInternal(email, {
      orderId: orderId, 
      fullName: fullName,
      totalPrice: totalPrice,
      address: address
    });

    // Trả response duy nhất về cho Frontend
    return res.status(201).json({
      success: true,
      message: 'Your order has been placed successfully!',
      order: createdOrder
    });

  } catch (error) {
    console.error("Failed to create order.", error); 
    res.status(500).json({
      success: false,
      message: 'A server error occurred while creating the order.',
      error: error.message,
    });
  }
};

// ------------- [LẤY ĐƠN HÀNG TỪ MÃ ĐƠN ĐẶT HÀNG VÀ EMAIL ] ------------- 
export const getOrderByOrderId = async (req, res) => {
  try {
    const { id } = req.params; 
    const { email } = req.params;
    
    // Tìm đơn hàng theo orderId và populate thông tin sản phẩm
    const order = await Order.findOne({ orderId: id, 'shippingInfo.email': email }).populate('orderItems.product', 'name image price');
    if (!order) {
      return res.status(404).json({ success: false, message: 'No order found with this ID or email.' });
    }
    

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ------------- [LẤY DANH SÁCH ĐƠN HÀNG CỦA 1 USER] ------------- 
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params; 

    // sắp xếp ngày mới nhất lên đầu
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

