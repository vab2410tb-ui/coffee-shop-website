import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout.jsx';
import AuthLayout from './components/Layouts/AuthLayout.jsx';
import HomePage from './pages/home/Home.jsx';
import ShopPage from './pages/shop/Shop.jsx';
import CategoryPage from './pages/shop/CategoryPage.jsx';
import ProductDetailPage from './pages/shop/ProductDetail.jsx';
import WarrantyPage from './pages/warranty/Warranty.jsx';
import ContactPage from './pages/contact/Contact.jsx';
import ProductManagement from './pages/admin/ProductManagement.jsx';
import Auth from './components/Authentication/Auth.jsx';
import Profile from './pages/profile/ProfilePage.jsx';
import Orders from './pages/Orders/Orders.jsx';
import CartPage from './pages/cart/CartPage.jsx';
import CheckoutPage from './pages/checkout/CheckOutPage.jsx';
import ConfirmPage from './pages/confirmed/ConfirmPage.jsx';
import SearchOrder from './pages/searchOrder/SearchOrderPage.jsx';


const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:slug" element={<CategoryPage />} />
          <Route path="/products/:sku" element={<ProductDetailPage />} />
          <Route path="/warranty" element={<WarrantyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search-order" element={<SearchOrder />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/authentic/login" element={<Auth />} />
        </Route>

        <Route path="/confirmed/:orderId" element={<ConfirmPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/profile/:userId?" element={<Profile />} />
        <Route path="/orders/:userId?" element={<Orders />} />
        <Route path="/admin/products" element={<ProductManagement />} />
      </Routes>
    </div>
  );
};

export default App;
