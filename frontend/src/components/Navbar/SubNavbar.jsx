import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import subnav from './subnavbar.module.scss';
import userService from '../../service/userService';

const SubNavbar = () => {
  const [formData, setFormData] = useState({
    _id: '', // Thêm _id vào đây để tránh undefined lúc chưa load xong API
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const isAuthenticated = localStorage.getItem('userInfo');
        if (!isAuthenticated) {
          navigate('/');
          return;
        }
        const dataUser = await userService.getProfile();
        setFormData(dataUser);
      } catch (err) {
        console.log('Your session has expired. Please log in again!');
        localStorage.removeItem('userInfo');
        navigate('/login');
      }
    };
    fetchProfileData();
  }, [navigate]);

  return (
    <div>
      <header>
        <div className={subnav.container}>
          <Link to="/">
            <img src="/icon/image.png" alt="NabCoffeeShop" width={80} />
          </Link>

          <NavLink
            to={formData._id ? `/orders/${formData._id}` : '/orders'}
            style={({ isActive }) => ({
              textDecoration: isActive ? 'underline' : 'none',
              textUnderlineOffset: isActive ? '4px' : 'auto',
              fontWeight: isActive ? 'bold' : 'normal',
              color: '#333'
            })}
          >
            Orders
          </NavLink>

          <NavLink
            to={formData._id ? `/profile/${formData._id}` : '/profile'}
            style={({ isActive }) => ({
              textDecoration: isActive ? 'underline' : 'none',
              textUnderlineOffset: isActive ? '4px' : 'auto',
              fontWeight: isActive ? 'bold' : 'normal',
              color: '#333'
            })}
          >
            Profile
          </NavLink>

          <li style={{ listStyle: 'none', marginLeft: 'auto' }}>
            <div className={subnav.down}>
              <div style={{ display: 'flex' }} className={subnav.dropdown}>
                <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '25px' }} />
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={subnav.iconDown}
                  style={{ fontSize: '20px' }}
                />
              </div>

              <ul className={subnav.listSetting}>
                <li
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    borderBottom: '1px solid',
                    paddingBottom: '20px',
                  }}
                >
                  <span>
                    <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '32px' }} />
                  </span>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      color: '#222222',
                    }}
                  >
                    <p>{formData.name}</p>
                    <p>{formData.email}</p>
                  </div>
                </li>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    marginTop: '40px',
                  }}
                >
                  {/* Đổi user._id thành formData._id */}
                  <Link to={formData._id ? `/profile/${formData._id}` : '/profile'} style={{ textDecoration: 'none' }}>
                    <p style={{ color: '#000', fontWeight: '300' }}>Profile</p>
                  </Link>

                  {/* Bọc thêm thẻ Link cho nút Orders trong dropdown */}
                  <Link to={formData._id ? `/orders/${formData._id}` : '/orders'} style={{ textDecoration: 'none' }}>
                    <p style={{ color: '#000', fontWeight: '300' }}>Orders</p>
                  </Link>

                  <p
                    onClick={handleLogout}
                    style={{
                      textAlign: 'left',
                      color: '#000',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '300',
                      marginBottom: '20px',
                    }}
                  >
                    Log out
                  </p>
                </div>
              </ul>
            </div>
          </li>
        </div>
      </header>
    </div>
  );
};

export default SubNavbar;