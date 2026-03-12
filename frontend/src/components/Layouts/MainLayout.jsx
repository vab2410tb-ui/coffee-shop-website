import { Outlet } from 'react-router-dom';
import Header from '../Navbar/MainNavbar.jsx';
import Footer from '../Footer/Footer.jsx';
import CartDrawer from '../CartProduct/CartDrawer.jsx';

export default function MainLayout() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
