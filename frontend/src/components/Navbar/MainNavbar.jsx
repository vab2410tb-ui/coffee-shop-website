import { Link } from 'react-router-dom';
import { useContext, useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faChevronDown,
  faCircleUser,
  faBoxOpen,
} from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../features/ContextProvider.jsx';
import { AuthContext } from '../../features/AuthContext.jsx';
import ProductService from '../../service/productService.js';
import header from './navbar.module.scss';
import SearchNavBar from './SearchNavBar.jsx';

const NavBar = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { userInfo, logout } = useContext(AuthContext);
  const { toggleCart, cart } = useContext(CartContext);
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // const goToCartPage = () => {
  //   toggleCart(false);
  //   navigate('/cart');
  // };

  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  }, 500);

  return () => clearTimeout(timer);
}, [searchTerm]);
  useEffect(() => {
  const fetchProducts = async () => {
    if (!debouncedSearch.trim()) {
      setProducts([]);
      return;
    }

    try {
      const res = await ProductService.getDetailProductsBySku(debouncedSearch);
      setProducts(res.data?.data || res.data || []);
    } catch (error) {
      console.error("Fetch products failed:", error);
      setProducts([]);
    }
  };

  fetchProducts();
}, [debouncedSearch]);
  console.log(products);
  return (
    <div>
      <div className={header.header}>
        <div className={header.header__logo}>
          <Link to="/" className={header.header__link}>
            <img src="/icon/image.png" alt="NabCoffeeShop" />
          </Link>
        </div>
        <div className={`${header['header__main-nav']}`}>
          <ul className={header.header__list}>
            <li>
              <Link to="/" className={header.header__link}>
                HOME
              </Link>
            </li>
            <li className={header['header__link-shop']}>
              <Link to="/shop">SHOP </Link>
              <FontAwesomeIcon
                icon={faChevronDown}
                style={{ width: '15px', height: '15px', marginLeft: '7px' }}
              />

              <ul className={header['link__shop-list']}>
                <li>
                  <Link to="/shop/espresso-machine">ESPRESSO MACHINE</Link>
                </li>
                <li>
                  <Link to="/shop/grinder-machine">GRINDER MACHINE</Link>
                </li>
                <li>
                  <Link to="/shop/coffee-beans">COFFEE BEANS</Link>
                </li>
                <li>
                  <Link to="/shop/accessories">ACCESSORIES</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/warranty" className={header.header__link}>
                WARRANTY
              </Link>
            </li>
            <li>
              <Link to="/contact" className={header.header__link}>
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
        {userInfo ? (
          <div className={`${header['header__secondary-nav']}`}>
            <ul>
              <li className={header.userMenu}>
                <Link to="/profile">
                  <FontAwesomeIcon icon={faUser} className={header.iconUser} />
                  <FontAwesomeIcon icon={faChevronDown} />
                </Link>
                <ul className={header.iconUser_list}>
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
                      <p>{userInfo.name}</p>
                      <p>{userInfo.email}</p>
                    </div>
                  </li>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '30px',
                      marginTop: '40px',
                    }}
                    className={header.userSetting}
                  >
                    <Link to="/profile">
                      <p style={{ color: '#000', fontWeight: '300' }}>Profile</p>
                    </Link>

                    <Link to={`/orders/${userInfo._id}`}>
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
              </li>

              <li>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={header.icon} />
              </li>

              <li>
                <div className={header.iconWrapper} onClick={() => toggleCart(true)}>
                  <FontAwesomeIcon icon={faCartShopping} className={header.icon} />
                  <span className={header.badge}>{totalItems}</span>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <div className={`${header['header__secondary-nav']}`}>
            <ul>
              {/* Profile User */}
              <li className={header.userMenu}>
                <Link to="/profile">
                  <FontAwesomeIcon icon={faUser} className={header.iconUser} />
                </Link>
                <ul className={header.iconUser_list}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span>
                      <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '32px' }} />
                    </span>
                    <h4>
                      <Link to="/authentic/login">Log in</Link>
                    </h4>
                  </li>
                </ul>
              </li>

              {/* Find product */}
              <li>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={header.icon} />
                <input
                  type="text"
                  placeholder="Search by product name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '12px',
                    width: '500px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                />
              </li>
              {/* Cart product */}
              <li>
                <div className={header.iconWrapper} onClick={() => toggleCart(true)}>
                  <FontAwesomeIcon icon={faCartShopping} className={header.icon} />
                  <span className={header.badge}>{totalItems}</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className={header.title}>
        <span>Free Shipping on orders over 500.000₫</span>
        <Link to="/search-order">
          <span>
            Track Your Order <FontAwesomeIcon icon={faBoxOpen} style={{ marginLeft: '10px' }} />
          </span>
        </Link>
      </div>
      {debouncedSearch && products.length > 0 && (
  <SearchNavBar products={products} />
)}
    </div>
  );
};

export default NavBar;
