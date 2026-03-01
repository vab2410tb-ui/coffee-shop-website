import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../../features/ContextProvider";
import styles from "./cartdrawer.module.scss";

const CartDrawer = () => {
  const { isCartOpen, toggleCart, cart, dispatch } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0 );
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  // Lọc sản phẩm có màu

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);
  
  return (
    <>
      <div className={`${styles.overlay} ${isCartOpen ? styles.showOverlay : ""}`} onClick={() => toggleCart(false)}></div>
      
      <div className={`${styles.drawer} ${isCartOpen ? styles.open : ""}`}>
        <div className={styles.header}>
            <div className={styles.text}>
                <h2>Shopping Cart</h2>
                <span>{totalItems}</span>
            </div>
          <button onClick={() => toggleCart(false)}><FontAwesomeIcon icon={faXmark} /></button>
        </div>

        <div className={styles.cartItems}>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={`${item._id}-${item.colorCode}-${index}`}>
                <div key={item._id} className={styles.item}>
                  <div className={styles.info}>
                    <img src={item.image || item.mainImage} alt={item.name} width="95px" height="95px" />
                    <div>
                      <h4>{item.name}</h4>
                      <p>{new Intl.NumberFormat("vi-VN").format(item.price * item.quantity,)}{" "}VND</p>
                      {item.color && <p>Color: {item.color}</p>}
                    </div>
                  </div>
                  <div className={styles.btn}>
                    <div>
                      <button onClick={() => dispatch({ type: "Increase", id: item._id, colorCode: item.colorCode }) }>+</button>
                      <p className={styles.quantity}>{item.quantity}</p>
                      <button onClick={() => dispatch({ type: "Decrease", id: item._id, colorCode: item.colorCode }) }>-</button>
                    </div>
                      <button onClick={() => dispatch({ type: "Remove", id: item._id, colorCode: item.colorCode })}
                                style={{marginTop:'10px', border: 'none', backgroundColor: '#fff', textDecoration: 'underline solid #000', cursor:'pointer'}}
                      >
                      Remove
                      </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.text_2}>
                <p>Your shopping cart is currently empty.</p>
                <button onClick={() => toggleCart(false)}>Continue shopping</button>
            </div>
          )}
          
        </div>
        <div className={styles.footer}>
            <div className={styles.checkoutTotal} >
              <h3>Total:</h3>
              <p>{new Intl.NumberFormat("vi-VN").format(totalPrice)}{" "}VND </p>
            </div>
          
            <div className={styles.checkoutBtn}>
              <button>View cart</button>
              <button>Pay now</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
