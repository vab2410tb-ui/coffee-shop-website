import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../../features/ContextProvider.jsx";
import Loading from "../../components/Loading/Loading.jsx";

const ProductItem = ({ product, category }) => {
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const hasColorOptions = product.variants && product.variants.length > 0 && product.variants[0].color !== "";

  const defaultVariant = product.variants?.[0] || {};

 const currentStock = hasColorOptions ? 0 : (defaultVariant.stock || 0);

  const itemInCart = cart.find(
    (item) => item._id === product._id && item.colorCode === defaultVariant.colorCode
  );
  const curQtyInCart = itemInCart ? itemInCart.quantity : 0;

  const isOutOfStock = !hasColorOptions && currentStock <= 0;
  const isMaxedOut = !hasColorOptions && curQtyInCart >= currentStock;

  const handleButtonClick = async () => {
    // Case 1: Có màu -> Chuyển hướng sang trang chi tiết để chọn
    if (hasColorOptions) {
      navigate(`/products/${product.sku}`);
      return; 
    }

    // Case 2: Không màu -> Add thẳng biến thể mặc định vào giỏ
    if (isOutOfStock || isMaxedOut || isAdding) return;

    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Gửi data lên Reducer (dùng thẳng defaultVariant từ Database)
    dispatch({ 
      type: "Add", 
      product: product,
      variant: defaultVariant
    });

    setIsAdding(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  const isDisabled = !hasColorOptions && (isOutOfStock || isMaxedOut || isAdding);

  return (
    <div key={product._id}>
      <div className={`${category.wrapper} ${isDisabled ? category.disabledWrapper : ""}`}>
        {isOutOfStock && <span className={category.outOfStockLabel}>Sold out</span>}
        
        <button
          className={`${category.btn} ${isSuccess ? category.btnSuccess : ""}`}
          onClick={handleButtonClick}
          disabled={isDisabled}
        >
          {isAdding ? (
            <Loading />
          ) : isSuccess ? (
            <> Added <FontAwesomeIcon icon={faCheck} /></>
          ) : hasColorOptions ? (
            "VIEW DETAILS" 
          ) : isOutOfStock ? (
            "SOLD OUT"
          ) : isMaxedOut ? (
            "OUT OF STOCK"
          ) : (
            "ADD TO CART"
          )}
        </button>
        <Link to={`/products/${product.sku}`}>
          <img src={product.mainImage} alt={product.name} />
        </Link> 
      </div>
      
      <h3>{product.name}</h3>
      <p>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
          currencyDisplay: "code",
        }).format(product.price)}
      </p>
    </div>
  );
};

export default ProductItem;