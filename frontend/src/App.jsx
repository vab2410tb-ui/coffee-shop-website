import {Routes, Route} from 'react-router-dom' ;
import Header from './components/Navbar/navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import HomePage from './pages/home/Home.jsx';
import ShopPage from './pages/shop/Shop.jsx';
import ProductManagement from './pages/admin/ProductManagement.jsx'
import CategoryPage from './pages/shop/CategoryPage.jsx';
import CartDrawer from './components/CartProduct/CartDrawer.jsx';
import ProductDetailPage from './pages/shop/ProductDetail.jsx'
import Scroll from "./components/Scroll.jsx";
import WarrantyPage from "./pages/warranty/Warranty.jsx"
function App() {
  
  return (
    <div className="app">

        <Header/>
        <CartDrawer/>
        <Scroll />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/shop' element={<ShopPage/>}/>
          <Route path='/warranty' element={<WarrantyPage/>}/>
          <Route path="/admin/products" element={<ProductManagement/>}/>
          <Route path='/shop/:slug' element={<CategoryPage/>}/>
          <Route path='/products/:sku' element={<ProductDetailPage/>}/>

        </Routes>
        <Footer/>
    </div>
   
 
     
      

  );
}

export default App;
