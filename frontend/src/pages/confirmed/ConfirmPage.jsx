import { useState, useEffect } from 'react';
import { Link, useParams, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import orderService from '../../service/orderService.js';
import confirm from './confirm.module.scss';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const ConfirmPage = () => {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await orderService.getOrderByID(orderId, email);
                if (response.success) {
                    setOrderData(response.order); 
                }
            } catch (error) {
                console.error("Order not found:", error);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) fetchOrder();
    }, [orderId, email]);


    if (loading) {
        return (
            <div className={confirm.container} style={{ textAlign: 'center', paddingTop: '50px' }}>
                <FontAwesomeIcon icon={faCircleNotch} spin size="2x" />
                <p>Loading order details...</p>
            </div>
        );
    }

    return (
        <div className={confirm.container}>
            <PageTitle title={`Order #${orderId} Success`} />
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Link to="/">
                    <img src="/icon/image.png" alt="NabCoffeeShop" />
                </Link>
                <h1 style={{ fontSize: '16px', borderBottom: '1px solid #3333331f', paddingBottom: '10px' }}>
                    Natural And Balance Joint Stock Company
                </h1>
            </div>

            {orderData ? (
                <div  className={confirm.form}>
                    <div style={{ borderRight: '2px solid #3333331f', paddingRight:'30px', flex: '55%'}}>
                        <div style={{marginTop: '30px', display: 'flex', gap: '20px', alignItems:'center' }}>
                            <FontAwesomeIcon icon={faCheck} style={{ border: '2px solid #3ee647', color: '#3ee647', borderRadius: '50%', padding: '17px 13px', fontSize: '24px' }} />
                            <div style={{display: 'flex', flexDirection:'column', gap: '10px'}}>
                                <p style={{ marginTop: '10px', color: '#333333b3' }}>
                                    Confirmation number <strong style={{ color: '#333333b3' }}>{orderId}</strong>
                                </p>
                                <h3 style={{fontSize: '22px'}}>Thank you, {orderData.shippingInfo.fullName}!</h3>
                            </div>
                        </div>
                        <div style={{margin: '80px 0 30px 0', border: '2px solid #3333331f', padding: '20px 15px', borderRadius:'12px'}}>
                            <h4 style={{marginBottom: '15px', fontSize:'18px'}}>Your order has been confirmed</h4>
                            <p>You will pay upon delivery.</p>
                        </div>
                        <div style={{margin: '0px 0 50px 0', border: '2px solid #3333331f', padding: '20px 15px', borderRadius:'12px'}}>
                            <h4 style={{fontSize: '18px'}}>Order details</h4>
                            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                                <div>
                                    <h5 style={{fontSize: '16px', margin: '20px 0 8px 0'}}>Contact information</h5>
                                    <p>{orderData.shippingInfo.email}</p>
                                </div>
                                <div>
                                    <h5 style={{fontSize: '16px', margin: '20px 0 8px 0'}}>Payment method</h5>
                                    <p>
                                        {orderData.paymentMethod === 'cod' 
                                        ? `Cash on Delivery (COD) · ${orderData.totalPrice?.toLocaleString()} VND` 
                                        : orderData.paymentMethod === 'qrbank' 
                                        ? 'Chuyển khoản ngân hàng (QR Bank)' 
                                        : orderData.paymentMethod
                                    }
                                    </p>
                                </div>
                                <div>
                                    <h5 style={{fontSize: '16px', margin: '20px 0 8px 0'}}>Shipping address</h5>
                                    <p>{orderData.shippingInfo.address}</p>
                                </div>
                                   <div>
                                    <h5 style={{fontSize: '16px', margin: '20px 0 8px 0'}}>Shipping method</h5>
                                    <p>Standard shipping (ships within 24 hours)</p>
                                </div>
                                <div>
                                    <h5 style={{fontSize: '16px', margin: '20px 0 8px 0'}}>Billing address</h5>
                                    <p>{orderData.shippingInfo.fullName}</p>
                                    <p>{orderData.shippingInfo.address}</p>
                                </div>
                            </div>
                            </div>

                            <div style={{display: 'flex', justifyContent:'space-between'}}>
                                <span>Need help? <NavLink to="/contact" style={{color:'#60b3f7'}}>Contact us</NavLink></span>
                                <button onClick={() => navigate('/')}>Continue shopping</button>
                            </div>
                        
                    </div>

                    <div className={confirm.orderDetail}>
                        {orderData.orderItems?.map((item, index) => (
                            <div key={index} style={{ display: 'flex', marginBottom: '10px', gap:'30px' }}>
                                <div style={{position:'relative', padding: '5px', border:'2px solid #3333331f', borderRadius: '15px'}}>
                                    <img src={item.mainImage||item.image} alt="" width={90} height={90} style={{borderRadius: '15px', display: 'block'}}/>
                                    <span 
                                        style={{position:'absolute', backgroundColor: '#333', color: '#fff', 
                                            width: '25px', textAlign:'center', padding:'2px', borderRadius:'5px',
                                            right:'-10px', top:'-10px'
                                            }}
                                    > 
                                        {item.quantity} 
                                    </span>
                                </div>

                                <span style={{display: 'flex', flexDirection:'column'}}>
                                    <p>{item.name}</p>
                                    <p>{item.color}</p>
                                </span>

                                <span>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(orderData.totalPrice)}</span>
                            </div>
                        ))}
                        <div style={{display: 'flex', justifyContent:'space-between', margin:'20px 0 10px 0'}}>
                            <span>Subtotal</span>
                            <span>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(orderData.totalPrice)}</span>
                        </div>
                        <div style={{display: 'flex', justifyContent:'space-between'}}>
                            <span>Shipping</span>
                            <span>FREE</span>
                        </div>
                        <div style={{display: 'flex', justifyContent:'space-between', marginTop:'20px', fontSize:'18px', fontWeight:'bold'}}>
                            <span>Total</span>
                            <span>{new Intl.NumberFormat('vi-VN').format(orderData.totalPrice)} VND</span>
                        </div>
                    </div>
                </div>
            ) : (
                !loading && <p>We couldn't find your order.</p>
            )}
        </div>
    );
}

export default ConfirmPage;


