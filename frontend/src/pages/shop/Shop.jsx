import shop from './shop.module.scss'
import { Link } from 'react-router-dom';

const Shop = () => {
    return (
        <>
        <div className={shop.container}>
            <div className={shop.banner}>
                <img src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301244/nab_coffee/products/main/uqx7jeunz3lonjaoztai.jpg" alt="" />
                <h1>SHOP</h1>
            </div>
            <h1>SHOP</h1>
            <section className={shop.category}>
                    <div className={shop.card}>
                        <div className={shop.imageWrapper}>
                            <Link to="/shop/espresso-machine">
                                <img src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301395/nab_coffee/products/main/qtl1urpvzahhwjz7mvsm.jpg" alt="" />
                            </Link>
                        </div>
                        <h2>ESPRESSO MACHINE</h2>
                    </div>
                    <div className={shop.card}>
                        <div className={shop.imageWrapper}>
                            <Link to="/shop/grinder-machine">
                                <img src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301398/nab_coffee/products/main/j40ddwhv46cm0gx9x56x.jpg" alt="" />
                            </Link>
                        </div>
                        <h2>GRINDER MACHINE</h2>
                    </div>
                    <div className={shop.card}>
                        <div className={shop.imageWrapper}>
                            <Link to="/shop/coffee-beans">
                                <img src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301414/nab_coffee/products/main/c2xkqetjm8s8n2grokux.jpg" alt="" />
                            </Link>
                        </div>
                        <h2>COFFEE BEANS</h2>
                    </div>
                    <div className={shop.card}>
                        <div className={shop.imageWrapper}>
                            <Link to="/shop/accessories">
                                <img src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301424/nab_coffee/products/main/x4yehtzygod9nls2qzg4.jpg" alt="" />
                            </Link>
                        </div>
                        <h2>ACCESSORIES</h2>
                    </div>
            </section>
           
        </div>
        </>

    )
}

export default Shop