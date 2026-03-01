import React, {createContext, useReducer, useState} from "react";
import CartReducer from './CartRenducer.jsx'

export const CartContext = createContext();

const ContextPorvider = ({children}) => {

    const [cart, dispatch] = useReducer(CartReducer, []);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const toggleCart = (open) => setIsCartOpen(open);

    return (
        <CartContext.Provider value={{cart, dispatch, isCartOpen, toggleCart}}>
            {children}
        </CartContext.Provider>
    )
}
export default ContextPorvider;