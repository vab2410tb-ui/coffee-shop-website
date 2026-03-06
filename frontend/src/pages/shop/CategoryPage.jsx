import { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../../features/ContextProvider.jsx';
import productService from '../../service/productService.js'
import category from './categorypage.module.scss';
import ProductItem from '../../components/ProductItem/ProductItem.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const categoryConfig = {
  'espresso-machine': {
    label: 'Espresso Machine',
    banner: 'https://res.cloudinary.com/drrao1nzd/image/upload/v1771074757/BannerShopEM_eexbd2.jpg',
  },
  'coffee-beans': {
    label: 'Coffee Beans',
    banner: 'https://res.cloudinary.com/drrao1nzd/image/upload/v1771076026/BannerShopCB_kpmqzx.jpg',
  },
  accessories: {
    label: 'Accessories',
    banner:
      'https://res.cloudinary.com/drrao1nzd/image/upload/v1771075516/BannerShopACC_d25xkd.jpg',
  },
  'grinder-machine': {
    label: 'Grinder Machine',
    banner: 'https://res.cloudinary.com/drrao1nzd/image/upload/v1771076023/BannerShopGM_e0ypkt.jpg',
  },
};

const CategoryPage = () => {
  const { slug } = useParams();
  const { dispatch } = useContext(CartContext);
  const [sortOrder, setSortOrder] = useState('default');
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setPageLoading(true);
      try {
        const res = await productService.getProductsByCategory(slug, sortOrder);
        setProducts(res.data);
      } catch (error) {
        console.error('Error loading product:', error);
      }
      setPageLoading(false);
    };

    if (slug) fetchProducts();
  }, [slug, sortOrder]);

  // Kiểm tra config để tránh lỗi khi slug không tồn tại
  const currentCategory = categoryConfig[slug] || { label: 'Category', banner: '' };

  return (
    <div className={category.container}>
      <PageTitle title={currentCategory.label}/>
      <div className={category.banner}>
        <img src={currentCategory.banner} alt={currentCategory.label} />
        <h1>{currentCategory.label}</h1>
      </div>

      <div className={category.path}>
        <Link to="/">HOME</Link> / <Link to="/shop">SHOP</Link> / <p>{currentCategory.label}</p>
      </div>

      <div className={category.sort}>
        <label style={{ fontWeight: 'bold', fontSize: '24px', marginRight: '10px' }}>
          Sort by:
        </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="default">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>

      <div className={category.productslist}>
        {pageLoading ? (
          <p>Loading products...</p>
        ) : products?.length > 0 ? (
          products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              dispatch={dispatch}
              category={category}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
