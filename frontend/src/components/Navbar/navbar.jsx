import {Link} from "react-router-dom"
import { useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faCartShopping, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from "../../features/ContextProvider";
import header from "./navbar.module.scss"


function Heading () {
    const { toggleCart, cart } = useContext(CartContext);
    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );
    return (
        <div className={header.header}>
            <div className={header.header__logo}>
                <img src="/icon/image.png" alt="" />
            </div>
            <div className={`${header['header__main-nav']}`}>
                <ul className={header.header__list}>
                    <li>
                        <Link to="/" className={header.header__link}>HOME</Link>
                    </li>
                    <li className={header["header__link-shop"]}>
                        <Link to="/shop" >SHOP </Link>
                        <FontAwesomeIcon icon={faChevronDown} style={{width: '15px', height:'15px', marginLeft:'7px'}} />

                        <ul className={header["link__shop-list"]}>
                            <li>
                                <Link to="/shop/espresso-machine">ESPRESSO MACHINE</Link>
                            </li>
                            <li>
                                <Link to="/shop/grinder-machine">GRINDER MACHINE</Link>
                            </li>
                            <li>
                                <Link to="/shop/coffee-beans">COFFEE BEANS</Link>
                            </li>
                            <li>
                                <Link to="/shop/accessories">ACCESSORIES</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/warranty" className={header.header__link}>WARRANTY</Link>
                    </li>
                     <li>
                        <Link to="/contact" className={header.header__link}>CONTACT</Link>
                    </li>
                    
                </ul>
            </div>
            <div className={`${header['header__secondary-nav']}`}>
                <ul>
                    <li><FontAwesomeIcon icon={faUser} className={header.icon} /></li>
                    <li><FontAwesomeIcon icon={faMagnifyingGlass} className={header.icon} /></li>
                    <li>
                        <div className={header.iconWrapper} onClick={() => toggleCart(true)}>
                            <FontAwesomeIcon icon={faCartShopping} className={header.icon} />
                            <span className={header.badge}>{totalItems}</span>
                        </div>

                    </li>
                        
                </ul>
                
            </div>
            
        </div>
    );
}

export default Heading;