import { useContext, useState } from "react";
import { Link } from 'react-router-dom'
import Loading from "../../components/Loading/Loading.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../../features/ContextProvider.jsx";

const ProductItem = ({ product, home }) => {
  const {cart, dispatch} = useContext(CartContext)
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const currentStock = product.stock

  const itemInCart = cart.find((item) => item._id === product._id);
  const curQtyInCart = itemInCart ? itemInCart.quantity : 0;

  const isOutOfStock = product.stock === 0;
  const isMaxedOut = curQtyInCart >= currentStock;
    

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const defaultVariant = product.variants?.[0] || { color: "", colorCode: "", stock: 0, images: [] };
    dispatch({ 
      type: "Add", 
      product: product,
      variant: defaultVariant,
      quantity: 1  
    });
    setIsAdding(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2000);
  };

  const isDisabled = isOutOfStock || isMaxedOut || isAdding;

  return (
    <div key={product._id}>
      <div className={`${home.wrapper} ${isDisabled ? home.disabledWrapper : ""}`}>
        {isOutOfStock && <span className={home.outOfStockLabel}>Sold out</span>}
        <button
          className={`${home.btn} ${isSuccess ? home.btnSuccess : ""}`}
          onClick={handleAddToCart}
          disabled={isDisabled}
        >
       {isAdding ? (<Loading />) : isSuccess ? (<> Added <FontAwesomeIcon icon={faCheck} /></>): isOutOfStock ? (
                   "OUT OF STOCK") : isMaxedOut ? (
                   "SOLD OUT" ) : (<>ADD TO CART</>)}
        </button>
      <Link to={`/products/${product.sku}`}>
        <img src={product.mainImage} alt={product.title} />
      </Link>
      </div>
      <h3>{product.name}</h3>
      <p style={{marginBottom:'50px'}}> 
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
