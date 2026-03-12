import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const OrderDetai = ({ order, orderData, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={order.overlay} onClick={onClose}>
      <div
        className={`${order.orderinf} ${order.popupContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className={order.btnClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h3>ORDER INFOMATION</h3>
        <p style={{ marginBottom: '10px' }}>
          Order ID: <strong>{orderData.orderId}</strong>
        </p>
        <p>
          Order status: <strong>{orderData.status}</strong>
        </p>
        <div className={order.infgr}>
          <div className={order.infgr_box}>
            <h4>CUSTOMER INFORMATION</h4>
            <div>
              <p>Full name: {orderData.shippingInfo?.fullName}</p>
              <p>Phone: {orderData.shippingInfo?.phone}</p>
              <p>Email: {orderData.shippingInfo?.email}</p>
              <p>Address: {orderData.shippingInfo?.address}</p>
            </div>
          </div>
          <div className={order.infgr_box}>
            <h4>DELIVERY INFORMATION</h4>
            <div>
              <p>Full name: {orderData.shippingInfo?.fullName}</p>
              <p>Phone: {orderData.shippingInfo?.phone}</p>
              <p>Email: {orderData.shippingInfo?.email}</p>
              <p>Address: {orderData.shippingInfo?.address}</p>
            </div>
          </div>
          <div className={order.infgr_box}>
            <h4>PRODUCT LIST ({orderData.orderItems.length})</h4>
            <div style={{ overflowY: 'scroll', maxHeight: '200px' }}>
              {orderData.orderItems &&
                orderData.orderItems.map((item, index) => (
                  <div key={index} className={order.infgr_prlist}>
                    <img src={item.image} alt="" width={90} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <span>{item.name}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>{item.color}</span>
                      <span>Price: {new Intl.NumberFormat('vi-VN').format(item.price)} VND</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={order.infgr_box}>
            <h4>PAYMENT</h4>
            <div>
              <p>Order Value:{new Intl.NumberFormat('vi-VN').format(orderData.totalPrice)} VND</p>
              <p>Discounts: 0 VND</p>
              <p>Delivery Fee: 0 VND</p>
              <p style={{ fontSize: '20px' }}>
                <strong>
                  Total Amount: {new Intl.NumberFormat('vi-VN').format(orderData.totalPrice)} VND
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetai;
