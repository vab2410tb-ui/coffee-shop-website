// SearchNavBar.jsx
import { Link } from 'react-router-dom';

const SearchNavBar = ({ products }) => {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: '100%', 
          left: '50%', 
          transform: 'translateX(-50%)',
          width: '500px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: '8px',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 9999, 
        }}
      >
        {!Array.isArray(products) || products.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            No products found.
          </div>
        ) : (
          products.map((p) => (
            <Link
              to={`/products/${p.sku}`} 
              key={p._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                borderBottom: '1px solid #eee',
                textDecoration: 'none',
                color: '#333',
              }}
            >
              {/* Ảnh */}
              <img
                src={p.mainImage}
                width="50"
                height="50"
                style={{ objectFit: 'cover', borderRadius: '4px', marginRight: '15px' }}
                alt={p.name}
              />

              {/* Thông tin */}
              <div style={{ flex: 1 }}>
                <b style={{ fontSize: '14px', display: 'block' }}>{p.name}</b>
                <small style={{ color: '#7f8c8d' }}>SKU: {p.sku}</small>
                <b style={{ fontSize: '14px', display: 'block' }}>{p.price}</b>
              </div>

              {/* Trạng thái tồn kho */}
              <div>
                <span
                  style={{
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: p.variants?.[0]?.stock > 0 ? 'green' : 'red',
                    backgroundColor: p.variants?.[0]?.stock > 0 ? '#ddeedf' : '#ffe6e6',
                  }}
                >
                  {p.variants?.[0]?.stock > 0 ? 'In Stock' : 'Out of stock'}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchNavBar;
