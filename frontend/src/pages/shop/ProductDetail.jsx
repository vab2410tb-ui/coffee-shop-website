import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../features/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import productService from '../../service/iproductService.js';
import productDetail from './productdetail.module.scss';
import Loading from '../../components/Loading/Loading.jsx';
import ProductAccordion from '../../components/ProductItem/ProductAccordion.jsx';
import IntroProduct from '../../components/ProductItem/ProductIntro.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const ProductDetailPage = () => {
  const { sku } = useParams();
  const { cart, dispatch } = useContext(CartContext);
  const [products, setProducts] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Số lượng tồn kho màu đang chọn
  const currentStock = selectedVariant?.stock;

  // Số lượng của màu đã chọn ở trong giỏ hàng
  const itemInCart = cart.find(
    (item) => item._id === products._id && item.colorCode === selectedVariant?.colorCode,
  );
  // Lọc sản phẩm có màu
  const validVariants = products?.variants?.filter((v) => v.color);

  const curQtyInCart = itemInCart ? itemInCart.quantity : 0;
  const isOutOfStock = currentStock <= 0;
  const isMaxedOut = curQtyInCart >= currentStock;
  const availableToAdd = currentStock - curQtyInCart;

  const isDisabled = isOutOfStock || isMaxedOut || quantity > availableToAdd || isAdding;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < availableToAdd) {
      setQuantity(quantity + 1);
    }
  };

  const handleButtonClick = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    dispatch({
      type: 'Add',
      product: products,
      variant: selectedVariant,
      quantity: quantity,
    });

    setIsAdding(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setQuantity(1);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await productService.getDetailProductsBySku(sku);
        setProducts(res.data);
        if (res.data?.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };
    if (sku) fetchProductDetails();
  }, [sku]);

  return (
    <div className={productDetail.container}>
      <PageTitle title={products.name} />
      {/* ====== BEGIN LAYOUT: Production Detail ====== */}
      <div className={productDetail.product}>
        {/* ====== BEGIN LAYOUT: Hình ảnh sản phẩm ====== */}
        <div className={productDetail.productImg}>
          {selectedVariant?.images?.length > 0 ? (
            selectedVariant.images.map((img, index) => (
              <img
                src={img || products.mainImage}
                alt={products.name}
                key={index}
                style={{
                  overflow: 'hidden',
                }}
              />
            ))
          ) : (
            <div>
              <img src={products?.mainImage} alt={products?.name} />
            </div>
          )}
        </div>
        {/* ====== END LAYOUT: Production Detail ====== */}

        {/* ====== BEGIN LAYOUT: Thông tin sản phẩm ====== */}
        <div className={productDetail.productInfo}>
          <h2
            style={{
              fontSize: '26px',
              marginBottom: '15px',
            }}
          >
            {products?.name}
          </h2>
          <p
            style={{
              fontSize: '22px',
            }}
          >
            {new Intl.NumberFormat('vi-VN').format(products?.price || 0)} VND
          </p>
          {/* Hiện màu sắc sản phẩm */}
          {validVariants && validVariants.length > 0 && (
            <div style={{ marginTop: '15px', }} >
              <p style={{ fontSize: '22px', }} >
                {' '} Color: {' '}
                <span style={{ fontSize: '22px', }} >
                  {selectedVariant?.color}
                </span>
              </p>
              <div style={{ display: 'flex', gap: '30px', marginTop: '10px', }}
              >
                {products.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => handleVariantChange(variant)}
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: variant.colorCode || 'transparent',
                      border:
                        selectedVariant?._id === variant._id ? '2px solid #000' : '1px solid #ccc',
                      cursor: 'pointer',
                      borderRadius: '50%',
                    }}
                    title={variant.color}
                  />
                ))}
              </div>
            </div>
          )}
          <div
            style={{
              marginTop: '35px',
            }}
          >
            {/* Điều kiện: Nếu còn hàng thì hiện add to cart, nếu hết hàng thì hiện out of stock */}
            {currentStock > 0 ? (
              <div className={productDetail.inStock}>
                <img
                  src="/icon/dotInStock.jpg"
                  alt=""
                  style={{
                    height: '16px',
                    width: '16px',
                  }}
                />
                <p style={{margin:'0'}}> In stock, ready for delivery</p>
              </div>
            ) : (
              <div className={productDetail.outOfStock}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#FF5335" fillOpacity="0.43" />
                  <path
                    d="M13 8C13 10.7614 10.7614 13 8 13C5.23858 13 3 10.7614 3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8Z"
                    fill="#F42D2D"
                  />
                </svg>
                <p style={{margin:'0'}}>Sold out</p>
              </div>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
              marginTop: '15px',
              marginBottom: '15px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '15px',
                marginBottom: '15px',
                border: '1px solid #D9D9D9',
                borderRadius: '40px',
              }}
            >
              <button
                onClick={handleDecrease}
                disabled={quantity <= 1}
                style={{
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <span
                style={{
                  width: '50px',
                  textAlign: 'center',
                  fontSize: '18px',
                  paddingBottom: '3px',
                }}
              >
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                // Disable nút + nếu số lượng chọn >= số lượng thực tế có thể mua (Kho - Giỏ hàng)
                disabled={quantity >= availableToAdd}
                style={{
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                }}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>

            <button
              className={productDetail.btnAdd}
              onClick={handleButtonClick}
              disabled={isDisabled}
              style={{
                padding: '15px 170px',
                borderRadius: '40px',
                border: 'none',
                width: '430px',
                color: '#fff',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.6 : 1,
                whiteSpace: 'nowrap',
              }}
            >
              {isAdding ? (
                <Loading />
              ) : isSuccess ? (
                <>
                  {' '}
                  Added <FontAwesomeIcon icon={faCheck} />
                </>
              ) : isOutOfStock ? (
                'SOLD OUT'
              ) : isMaxedOut ? (
                'MAX IN CART'
              ) : (
                <>ADD TO CART</>
              )}
            </button>
          </div>

          {products?.description?.productFeatures?.map((item, index) => (
            <li
              key={index}
              style={{
                fontSize: '20px',
                color: '#646464',
                margin: '10px 0 0 20px',
              }}
            >
              {item}
            </li>
          ))}

          {/* ======= BEIGN: Product Accordion ====== */}
          <div>
            <ProductAccordion products={products} productDetail={productDetail} />
          </div>
          {/* ======= END: Product Accordion ====== */}
        </div>
        {/* ====== END LAYOUT: THông tin sản phẩm ====== */}
      </div>
      {/* ====== END LAYOUT: Production Detail ====== */}

      {/* ====== BEGIN: Intro Product */}
      <div>
        <IntroProduct products={products} productDetail={productDetail} />
      </div>
      {/* ====== BEGIN: Intro Product */}
    </div>
  );
};

export default ProductDetailPage;
