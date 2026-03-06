import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../../features/ContextProvider'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import styles from './checkout.module.scss'; 
import orderService from '../../service/orderService';
import Loading from '../../components/Loading/Loading.jsx'
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const ACCORDION_PAYMENT = [
  {
    id: 'COD',
    title: 'Cash on Delivery (COD)',
    content: 'You will pay upon delivery.'
  },
  {
    id: 'QR',
    title: 'Bank Transfer',
    img: 'https://res.cloudinary.com/drrao1nzd/image/upload/v1772547266/qrbank_nqvj9u.jpg',
    content: 'Scan the QR code to complete the payment.'
  },
]
const CheckoutPage = () => {

  const { cart, dispatch, toggleCart } = useContext(CartContext);
  // const [activeTabs, setActiveTabs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
        return () => {
        toggleCart(false);
        };
  }, [toggleCart]);

  useEffect(() => {
    const savedNote = localStorage.getItem('savedNote');
    if (savedNote) {
        setShippingInfo(prev => ({ ...prev, note: savedNote }));
    }
  }, []);
  
  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: userInfo?.name || '',
    email: userInfo?.email || '',
    phone: userInfo?.phone || '',
    address: userInfo?.address || '',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD'); 
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    const currentPath = window.location.pathname;
    if (currentPath === '/checkout') {
      window.location.reload(); 
    } else {
      window.location.href = '/'; 
    }
  };

  const handleLogin = () => {
    navigate('/authentic/login', {
      state: { from: '/checkout' }
    });
  }

  // xử lý đặt hàng
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Cart is currently empty!");
      return;
    }
    setIsLoading(true);
    const formattedOrderItems = cart.map(item => ({
      name: item.name,
      color: item.color,
      quantity: item.quantity,
      image: item.image,
      price: item.price,
      product: item._id 
    }));

    const orderPayload = {
      orderItems: formattedOrderItems,
      shippingInfo: {
        fullName: shippingInfo.fullName,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        address: shippingInfo.address,
        note: shippingInfo.note || "" 
      },
      paymentMethod: paymentMethod,
      totalPrice: totalPrice,
      userId: userInfo ? userInfo._id : null,
    };

    try {
        const data = await orderService.createOrder(orderPayload);
        if (data.success) {
          localStorage.removeItem('savedNote');
          dispatch({ type: 'CLEAR_CART' });
          navigate(`/confirmed/${data.order.orderId}`, { 
            state: { email: shippingInfo.email } 
          });
        } 
      } catch (errorMessage) {
          alert(errorMessage); 
          console.error('Checkout Error:', errorMessage);
      } finally {
          setIsLoading(false);
      }
    };

  return (
    <div className={styles.checkout_container} >
      <PageTitle 
        title="Checkout" 
        description="Complete your order at NabCoffeeShop" 
      />
      <div style={{display: 'flex', alignItems:'center', flexDirection:'column'}}>
        <Link to="/">
            <img src="/icon/image.png" alt="NabCoffeeShop" />
        </Link>
        <h1 style={{fontSize: '16px', borderBottom:'1px solid #3333331f'}}>Natural And Blance Joint Stock Company</h1>
      </div>
      {userInfo ? (
        <div className={styles.user}>
            <span><FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '32px' }} /></span>
            <p style={{margin: '0'}}>{userInfo.email}</p>
            <p 
              onClick={handleLogout} 
              style={{marginLeft: '20px',color: '#000', cursor: 'pointer', fontWeight: '300', border: '1px solid #3333331f', padding: '5px 8px', borderRadius:'10px', backgroundColor:'#f4f4f4' }} 
            >
              Log out
            </p>
        </div>

      ):(
        <p 
        onClick={handleLogin} 
        style={{ marginTop: '20px', cursor: 'pointer', border: '1px solid #3333331f', width:'fit-content', padding: '5px 8px', borderRadius:'10px', backgroundColor:'#f4f4f4' }}
        >
          Log in</p>
      )}

      <div className={styles.checkout_layout}>
        {/* CỘT TRÁI: FORM ĐIỀN THÔNG TIN */}
        <div className={styles.shipping_form}>
          <h3 style={{fontSize:'24px', marginBottom: '25px'}}>Delivery</h3>
          <form onSubmit={handlePlaceOrder}>
            <div>
              <label >Full name:</label>
              <input 
                type="text" name="fullName" placeholder="Full name" required
                value={shippingInfo.fullName} onChange={handleInputChange} 
              />
            </div>
            <div>
              <label >Email:</label>
              <input 
                type="email" name="email" placeholder="Email" required
                value={shippingInfo.email} onChange={handleInputChange} 
              />
            </div>
            <div>
              <label >Phone:</label>
              <input 
                type="tel" name="phone" placeholder="" required
                value={shippingInfo.phone} onChange={handleInputChange} 
              />
            </div>
            <div>
              <label >Address:</label>
              <input 
                type="text" name="address" placeholder="" required
                value={shippingInfo.address} onChange={handleInputChange} 
              />
            </div>
            <div>
               <label >Note</label>
              <textarea 
                name="note" 
                placeholder="Add a note..."
                value={shippingInfo.note} 
                onChange={handleInputChange}
              ></textarea>
            </div>
              
            {/* Chọn phương thức thanh toán */}
            <h3>Checkout</h3>
            <div className={styles.payment_container}>
              {ACCORDION_PAYMENT.map((method) => (
                <div key={method.id} className={styles.payment_item}>
                  <label className={styles.payment_label}>
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    {method.title}
                  </label>
                  <div className={`${styles.payment_content} ${paymentMethod === method.id ? styles.show : ''}`}>
                    <p>{method.content}</p>
                    {method.img && (
                      <img src={method.img} alt="QR Code" />
                    )}
                  </div>
              </div>
              ))}
            </div>

            <button type="submit" disabled={isLoading} className={styles.checkout_btn}>
              {isLoading ? <Loading/> : paymentMethod === 'COD' ? 'Continue' : 'Pay now'}
            </button>
          </form>
        </div>

        {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
        <div className={styles.order_summary}>
          <div>
            {cart.map((item, index) => (
              <div key={index} >
                <div className={styles.ordercart}>
                  <img src={item.image} alt={item.name} width="90" height="90" />
                  <div>
                    <p>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Color: {item.color}</p>
                  </div>
                  <span style={{}}>{new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)} VND</span>
                </div>
              </div>
                
            ))}
          </div>
          <div className={styles.total}>
            <strong>Total:</strong>
            <strong>{new Intl.NumberFormat('vi-VN').format(totalPrice)} VND</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;