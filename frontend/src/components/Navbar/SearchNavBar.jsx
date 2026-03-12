import { Link } from 'react-router-dom';
import { useEffect } from 'react';
const SearchNavBar = ({ products }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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

                textDecoration: 'none',
                color: '#333',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {p.variants?.map((item) => (
                  <div style={{display: 'flex', justifyContent:'space-between', padding: '10px 15px',
                        borderBottom: '1px solid #eee',}}>
                    <div
                      style={{
                        display: 'flex',
                        
                      }}
                    >
                      <span>
                        <img
                          src={item.images[1]}
                          width="50"
                          height="50"
                          style={{
                            objectFit: 'cover',
                            borderRadius: '4px',
                            marginRight: '15px',
                            borderBottom: '1px solid #eee',
                          }}
                          alt={item.name}
                        />
                      </span>
                      <span style={{ flex: 1 }}>
                        <b style={{ fontSize: '14px', display: 'block' }}>{p.name}</b>
                        <small style={{ color: '#7f8c8d' }}>SKU: {p.sku}</small>
                        <small style={{ fontSize: '14px', display: 'block' }}>Color: {item.color}</small>
                        <b style={{ fontSize: '14px', display: 'block' }}>{p.price}</b>
                      </span>
                    </div>

                    {/* Trạng thái tồn kho */}
                    <span
                      style={{
                        fontSize: '12px',
                        padding: '4px 8px',
                        height:'fit-content',
                        borderRadius: '4px',
                        color: item.stock > 0 ? 'green' : 'red',
                        backgroundColor: item.stock > 0 ? '#ddeedf' : '#ffe6e6',
                      }}
                    >
                      {item.stock > 0 ? 'In Stock' : 'Out of stock'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Thông tin */}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchNavBar;
