// src/pages/admin/ProductManagement.jsx
import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ProductService from '../../service/iproductService.js';
import AdminProductForm from '../../components/Admind/AdminProductForm.jsx';
import product_mgmt from './productmanagement.module.scss';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [sortOrder, setSortOrder] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filters = [
    { id: 'all', label: 'ALL' },
    { id: 'espresso-machine', label: 'ESSPRESSO MACHINE' },
    { id: 'grinder-machine', label: 'GRINDER MACHINE' },
    { id: 'coffee-beans', label: 'COFFEE BEANS' },
    { id: 'accessories', label: 'ACCESSORIES' },
  ];

  // lấy danh sách sản phẩm từ server
  const fetchProducts = useCallback(async () => {
    try {
      const data = await ProductService.getAll(searchTerm, filterType, sortOrder);
      setProducts(data);
    } catch (err) {
      console.error('Fetch products failed:', err);
    }
  }, [searchTerm, filterType, sortOrder]);

  useEffect(() => {
    if (editingId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [editingId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await ProductService.remove(id);
        await fetchProducts();
      } catch (err) {
        alert('Failed to delete the product. Please try again.');
      }
    }
  };

  return (
    <div className={product_mgmt.container}>
      <PageTitle title="Products" isAdmin />
      {/* Mục Inventory Management*/}
      <h1>Inventory Management</h1>
      <div className={product_mgmt.form}>
        <AdminProductForm
          productId={editingId}
          key={editingId || 'create'}
          onSuccess={() => {
            setEditingId(null);
            fetchProducts();
          }}
        />
        {editingId && (
          <button onClick={() => setEditingId(null)} className={product_mgmt.btn_edit}>
            Cancel Editing
          </button>
        )}
      </div>

      {/* Danh sách sản phẩm */}
      <div className={product_mgmt.table}>
        <h3 style={{ textAlign: 'center', marginBottom: '40px' }}>Products List </h3>

        {/* Tab chọn category */}
        <div className={product_mgmt.line}></div>
        <div className={product_mgmt.tab}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: '0.3s',
                backgroundColor: filterType === f.id ? '#555555' : '#ecf0f1',
                color: filterType === f.id ? '#fff' : '#555555',
                boxShadow: filterType === f.id ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Form search */}
        <div className={product_mgmt.srcbar}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={product_mgmt.icon} />
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
        </div>

        {/* Lọc danh sách sản phẩm */}
        <div
          style={{
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <label style={{ fontWeight: 'bold' }}>Sort By:</label>
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

        {/* Bảng danh sách sản phẩm */}
        <table
          border="1"
          style={{ width: '100%', borderCollapse: 'collapse', borderColor: '#ddd' }}
        >
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '12px' }}>No</th>
              <th style={{ padding: '12px' }}>Image</th>
              <th style={{ padding: '12px' }}>Product Name</th>
              <th style={{ padding: '12px' }}>Category</th>
              <th style={{ padding: '12px' }}>Price</th>
              <th style={{ padding: '12px' }}>Quantity in Stock</th>
              <th style={{ padding: '12px' }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center' }}>
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((p, index) => (
                <tr key={p._id} style={{ borderBottom: '1px solid #eee' }}>
                  {/* [No] */}
                  <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>

                  {/* [Image] */}
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <img
                      src={p.mainImage}
                      width="60"
                      height="60"
                      style={{ objectFit: 'cover', borderRadius: '4px' }}
                      alt=""
                    />
                  </td>

                  {/* [ProductName] */}
                  <td style={{ padding: '10px' }}>
                    <b>{p.name}</b>
                    <br />
                    <small style={{ color: '#7f8c8d' }}>SKU: {p.sku}</small>
                  </td>

                  {/* [Category] */}
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <span
                      style={{
                        padding: '6px 12px',
                        borderRadius: '15px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#333',
                      }}
                    >
                      {p.category ? p.category.toUpperCase() : 'Another'}
                    </span>
                  </td>

                  {/* [Price] */}
                  <td style={{ padding: '10px', fontWeight: 'bold', textAlign: 'center' }}>
                    {p.price?.toLocaleString()} VND
                  </td>

                  {/* [Quantity in Stock] */}
                  <td style={{ textAlign: 'center' }}>
                    {/* Kiểm tra: Có mảng variants VÀ variant đầu tiên phải có điền tên màu */}
                    {p.variants && p.variants.length > 0 && p.variants[0].color ? (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px',
                            padding: '10px 0',
                            justifyContent: 'center',
                          }}
                        >
                          {p.variants.map((variant, Index) => (
                            <div
                              key={Index}
                              style={{
                                display: 'flex',
                                minWidth: '100px',
                                fontSize: '13px',
                                justifyContent: 'flex-start',
                              }}
                            >
                              <span
                                style={{
                                  display: 'flex',
                                  gap: '6px',
                                  alignItems: 'center',
                                  width: '130px',
                                }}
                              >
                                <span
                                  style={{
                                    display: 'inline-block',
                                    width: '12px',
                                    height: '12px',
                                    marginLeft: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: variant.colorCode || '#ccc',
                                    border: '1px solid #999',
                                  }}
                                ></span>
                                {variant.color}:
                              </span>
                              <span
                                style={{
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontWeight: 'bold',
                                  color: variant.stock > 0 ? 'green' : 'red',
                                  backgroundColor: variant.stock > 0 ? '#ddeedf' : '#ffe6e6',
                                }}
                              >
                                {variant.stock > 0 ? variant.stock : 'Out of stock'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span
                        style={{
                          color: p.variants?.[0]?.stock > 0 ? 'green' : 'red',
                          fontWeight: 'bold',
                          background: p.variants?.[0]?.stock > 0 ? '#ddeedf' : '#ffe6e6',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          display: 'inline-block',
                        }}
                      >
                        {p.variants?.[0]?.stock > 0 ? p.variants[0].stock : 'Out of stock'}
                      </span>
                    )}
                  </td>

                  {/* [Action] */}
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button
                      onClick={() => setEditingId(p._id)}
                      style={{ marginRight: '8px', cursor: 'pointer', padding: '5px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      style={{ color: 'red', cursor: 'pointer', padding: '5px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;
