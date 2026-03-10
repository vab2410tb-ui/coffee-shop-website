import React, { useState } from 'react';
import orderService from '../../service/orderService.js';
import srcorderstyle from './srcorderstyle.module.scss';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import OrderTracking from '../../components/OrderTracking/OrderTracking.jsx'

const SearchOrder = () => {
  const [orderCode, setOrderCode] = useState('');
  const [email, setEmail] = useState('');
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
      setError(typeof err === 'string' ? err : err.message || 'An error occurred.');
    }
  };

  return (
    <div style={{ padding: '20px', margin: '200px 400px' }}>
      <PageTitle title="Search order" />
      <h2 style={{ textAlign: 'center' }}>ORDER LOOKUP</h2>
      <form
        onSubmit={handleSearch}
        style={{ display: 'flex', gap: '10px', margin: '25px 0', flexDirection: 'column' }}
      >
        <h5>Order ID</h5>
        <input
          type="text"
          placeholder="Your order ID: NAB-..."
          value={orderCode}
          onChange={(e) => setOrderCode(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <h5>Email</h5>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <button className={srcorderstyle.btn_f} type="submit">
          Find
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      { orderDetail && (<OrderTracking srcorderstyle={srcorderstyle} orderDetail={orderDetail}/>)}
      
    </div>
  );
};

export default SearchOrder;
