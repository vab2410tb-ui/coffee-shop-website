import React, { useState, useEffect } from 'react';
import orderService from '../../service/orderService.js'
import srcorderstyle from './srcorderstyle.module.scss'
import PageTitle from '../../components/PageTitle/PageTitle.jsx';


const SearchOrder = () => {

    const [orderCode, setOrderCode] = useState('');
    const [email, setEmail] = useState('')
    const [orderDetail, setOrderDetail] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!orderCode || !email) {
        setError('Please enter both Order ID and Email.');
        return;
        }
        setError('');
        setOrderDetail(null);

        try {
           const response = await orderService.getOrderByID(orderCode, email);
        
        if (response.success && response.order) {
            setOrderDetail(response.order); 
        } else {
            setError('No order found with this code.');
        }
    } catch (err) {
        setError(typeof err === 'string' ? err : (err.message || 'An error occurred.'));
        }
    };
    
    return (
       <div style={{ padding: '20px', margin: '200px 400px' }}>
            <PageTitle title="Search order" />
            <h2 style={{textAlign: 'center'}}>ORDER LOOKUP</h2>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', margin: '25px 0', flexDirection:'column' }}>
                <h5>Order ID</h5>
                <input 
                    type="text" 
                    placeholder="Your order ID: NAB-..." 
                    value={orderCode}
                    onChange={(e) => setOrderCode(e.target.value)}
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
                />
                <h5>Email</h5>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}/>
                <button className={srcorderstyle.btn_f} type="submit" >
                    Find
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            

            {orderDetail && (
                <div className={srcorderstyle.orderinf}>
                    <h3>ORDER INFOMATION</h3>
                    <p style={{marginBottom: '10px'}}>Order ID: <strong>{orderDetail.orderId}</strong></p>
                    <p>Order status: <strong>{orderDetail.status}</strong></p>
                    <div className={srcorderstyle.infgr}>
                        <div className={srcorderstyle.infgr_box}>
                            <h4>CUSTOMER INFORMATION</h4>
                            <div>
                                <p>Full name: {orderDetail.shippingInfo?.fullName}</p>
                                <p>Phone: {orderDetail.shippingInfo?.phone}</p>
                                <p>Email: {orderDetail.shippingInfo?.email}</p>
                                <p>Address: {orderDetail.shippingInfo?.address}</p>
                            </div>
                        </div>
                        <div className={srcorderstyle.infgr_box}>
                            <h4>DELIVERY INFORMATION</h4>
                            <div>
                                <p>Full name: {orderDetail.shippingInfo?.fullName}</p>
                                <p>Phone: {orderDetail.shippingInfo?.phone}</p>
                                <p>Email: {orderDetail.shippingInfo?.email}</p>
                                <p>Address: {orderDetail.shippingInfo?.address}</p>
                            </div>
                        </div>
                        <div className={srcorderstyle.infgr_box}>
                            <h4>PRODUCT LIST ({orderDetail.orderItems.length})</h4>
                            <div style={{overflowY: 'scroll', maxHeight: '200px'}}>
                                {orderDetail.orderItems && orderDetail.orderItems.map((item, index) => (
                                    <div key={index} className={srcorderstyle.infgr_prlist}>
                                        <img src={item.image} alt="" width={90} />
                                        <div style={{display:'flex', flexDirection:'column', gap: '5px'}}>
                                            <span>{item.name}</span>
                                            <span>Quantity: {item.quantity}</span>
                                            <span>{item.color}</span>
                                            <span>Price: {new Intl.NumberFormat('vi-VN').format(item.price)} VND</span>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                        <div className={srcorderstyle.infgr_box}>
                            <h4>PAYMENT</h4>
                            <div>
                                <p>Order Value:{new Intl.NumberFormat('vi-VN').format(orderDetail.totalPrice)} VND</p>
                                <p>Discounts: 0 VND</p>
                                <p>Delivery Fee: 0 VND</p>
                                <p style={{fontSize:'20px'}}><strong>Total Amount: {new Intl.NumberFormat('vi-VN').format(orderDetail.totalPrice)} VND</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchOrder;