import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import order from './order.module.scss';
import orderService from '../../service/orderService';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import dayjs from 'dayjs';
import SubNavbar from '../../components/Navbar/SubNavbar';
import OrderDetail from '../../components/OrderTracking/OrderDetail.user.jsx';
import SubFooter from '../../components/Footer/SubFooter.jsx';

const OrderPage = () => {
  const [products, setProducts] = useState([]);
  const [selectProduct, setSelectProduct] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  dayjs.extend(advancedFormat);

  const handleClick = (item) => {
    setSelectProduct(item);
  }
  
  useEffect(() => {
    const fetchOrderUser = async () => {
      try {
        const authentication = localStorage.getItem('userInfo');

        if (!authentication) {
          navigate('/');
          return;
        }

        if (!userId) return;

        const response = await orderService.getUserOrders(userId);

        if (response.success) {
          setProducts(response.orders);
        }
      } catch (error) {
        console.error();
      }
    };

    fetchOrderUser();
  }, [userId, navigate]);

  return (
    <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <SubNavbar />
      <div className={order.container}>
        <h1>Orders</h1>
        <div className={order.cardOrder}>
          {products && products.length > 0 ? (
            products.map((item) => {
              const totalItems = item.orderItems.reduce((sum, p) => sum + p.quantity, 0);
              const totalPrice = item.orderItems.reduce((sum, p) => sum + p.price, 0);
              const extraItems = item.orderItems.length - 1;

              return (
                <button className={order.cardItem} onClick={() => handleClick(item)} key={item.orderId}>
                  <div className={order.cardText}>
                    <p style={{ fontWeight: 'bold' }}>
                      <FontAwesomeIcon icon={faClock} /> {item.status}
                    </p>

                    <p style={{ fontSize: '14px' }}>
                      {dayjs(item.createdAt).format('DD MMM YYYY HH:mm')}
                    </p>
                  </div>

                  <div>
                    {item.orderItems.length > 1 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                        <div className={order.imgWrapper} data-count={extraItems}>
                          <img
                            src={item.orderItems[0].image}
                            width={300}
                            alt=""
                            style={{ borderRadius: '10px' }}
                          />
                        </div>
                        <p style={{ fontWeight: 'bold' }}>{totalItems} items</p>
                      </div>
                    ) : (
                      item.orderItems.map((p) => (
                        <div
                          key={p._id}
                          style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
                        >
                          <img src={p.image} width={300} alt="" style={{ borderRadius: '10px' }} />
                          <span style={{ fontWeight: 'bold' }}>{totalItems} item</span>
                        </div>
                      ))
                    )}
                    <p style={{ fontSize: '13px', color: '#333333b3' }}>{item.orderId}</p>
                  </div>
                  <p style={{ fontWeight: 'bold' }}>
                    {new Intl.NumberFormat('vi-VN').format(totalPrice)} VND
                  </p>
                  <span className={order.btnView}>View order</span>
                </button>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {selectProduct && <OrderDetail order={order} 
          orderData={selectProduct} 
          onClose={() => setSelectProduct(null)} 
      />}

      <SubFooter />
    </div>
  );
};

export default OrderPage;
