import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { SlideData, ExploreData, BlogData } from '../../data/products.js';
import { CartContext } from '../../features/ContextProvider.jsx';
import productService from '../../service/productService.js';
import HomeProductCard from '../../components/HomeCard/HomeProductCard.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx'
import home from './home.module.scss';

function Home() {
  const { dispatch } = useContext(CartContext);
  const [beans, setBeans] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [curIndex, setCurIndex] = useState(0);
  const [autoMoving, setAutoMoving] = useState(false);
  const [, setPageLoading] = useState(false);

  const navigate = useNavigate();
  // const btnPre = () => {
  //     const firstSlide = curIndex === 0;
  //     const newSlide = firstSlide ? SlideData.length - 1 : curIndex -1;
  //     setCurIndex(newSlide);
  // };

  // Click DOT
  const moving = (index) => {
    if (autoMoving) return;
    setCurIndex(index);
    setAutoMoving(true);

    setTimeout(() => {
      setAutoMoving(false);
    }, 500);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setPageLoading(true);
      try {
        const [beansRes, accRes] = await Promise.all([
          productService.getProductsByCategory('coffee-beans'),
          productService.getProductsByCategory('accessories'),
        ]);
        setBeans(beansRes.data);
        setAccessories(accRes.data);
      } catch (error) {
        console.error('Error loading product:', error);
      }
      setPageLoading(false);
    };

    fetchProducts();
  }, []);

  // Auto Moving
  useEffect(() => {
    const btnNxt = () => {
      const lastSlide = curIndex === SlideData.length - 1;
      const newSlide = lastSlide ? 0 : curIndex + 1;
      setCurIndex(newSlide);
    };
    const timer = setTimeout(() => {
      btnNxt();
    }, 5000);
    return () => clearTimeout(timer);
  }, [curIndex]);

  return (
    <>
      <div className={home.container} style={{ '--current-index': curIndex }}>
        <PageTitle />
        {/* ========== MOTION PROCESSING ==========  */}
        <div className={home.sliderWrapper}>
          {SlideData.map((item, index) => (
            <div className={home.banner} key={index}>
              <img src={item.src} alt="" />

              <div className={home.title}>
                <h2>{item.title}</h2>
                <h3>{item.title2}</h3>
                <button onClick={() => navigate(item.link)}>{item.btn}</button>
              </div>
            </div>
          ))}
        </div>
        <div className={home.dots}>
          {SlideData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                moving(index);
              }}
              className={`${home.dot} ${index === curIndex ? home.active : ''}`}
            ></button>
          ))}
        </div>
        {/* ========== END MOTION PROCESSING ========== */}
      </div>

      {/* BEGIN sections: Intro products */}
      <div className={home.introprd}>
        {/* SECTION ONE */}
        <section className={`${home['introprd__section-1']}`}>
          <div className={home.card}>
            <Link to="/shop/espresso-machine">
              <img
                src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301901/nab_coffee/products/main/cgzsdjzp9ghkuz612v0k.jpg"
                alt="CF at home"
              />
              <h2>Coffee At Home</h2>
              <p>View our products</p>
              <span>
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
            </Link>
          </div>

          <div>
            <Link to="/products/EM-MICRA">
              <div className={home.wrapper}>
                <img
                  src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301441/nab_coffee/products/main/j6uqabnuweyaf1cyzwci.jpg"
                  alt="Micra"
                />
              </div>
            </Link>
            <h3>Linea Micra</h3>
            <p>103.000.000 VND</p>
          </div>

          <div>
            <Link to="/products/EM-MINI">
              <div className={home.wrapper}>
                <img
                  src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301446/nab_coffee/products/main/mp6mryfctrpnfkd1mt22.jpg"
                  alt="Mini"
                />
              </div>
            </Link>
            <h3>Linea Mini</h3>
            <p>130.000.000 VND</p>
          </div>
        </section>

        {/* SECTION TWO */}
        <section className={`${home['introprd__section-1']}`}>
          <Link to="/shop/grinder-machine">
            <div className={home.card}>
              <img
                src="https://res.cloudinary.com/drrao1nzd/image/upload/v1770301903/nab_coffee/products/main/jijdijhhqqql2fqmxp87.jpg"
                alt="New up"
              />
              <h2>New up Shelves</h2>
              <p>View our products</p>
              <span>
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
            </div>
          </Link>

          <div>
            <Link to="/products/CG-PICO">
              <div className={home.wrapper}>
                <img
                  src="https://res.cloudinary.com/drrao1nzd/image/upload/v1771982974/pico_k37wvu.jpg"
                  alt="Pico"
                />
                <span>NEW</span>
              </div>
            </Link>
            <h3>Pico</h3>
            <p>27.000.000 VND</p>
          </div>
          <div>
            <Link to="/products/EM-LEVA-X1">
              <div className={home.wrapper}>
                <img
                  src="https://res.cloudinary.com/drrao1nzd/image/upload/v1771982975/levaX_axppg7.jpg"
                  alt="LevaX1"
                />
                <span>NEW</span>
              </div>
            </Link>
            <h3>LEVA X 1 GROUP</h3>
            <p>282.900.000 VND</p>
          </div>
        </section>

        {/* SECTION THREE: COFFEE BEANS */}
        <section className={`${home['introprd__section-2']}`}>
          <div className={home.line}></div>
          <h2>COFFEE BEANS</h2>
          <div className={home.cardbeans}>
            {beans.map((product, index) => (
              <div key={index}>
                <HomeProductCard
                  key={product._id}
                  product={product}
                  home={home}
                  dispatch={dispatch}
                />
              </div>
            ))}
          </div>
          <Link to="/shop/coffee-beans">
            <p
              style={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
                textDecoration: 'underline solid #000',
                cursor: 'pointer',
                textDecorationSkipInk: 'none',
                color: '#000',
              }}
            >
              View all products
            </p>
          </Link>
          <div className={home.line}></div>
        </section>

        {/* SECTION FOUR: ACCESSORIES */}
        <section className={`${home['introprd__section-2']}`}>
          <h2>COFFEE BEANS</h2>
          <div className={home.cardbeans}>
            {accessories.map((product, index) => (
              <div key={index}>
                <HomeProductCard
                  key={product._id}
                  product={product}
                  home={home}
                  dispatch={dispatch}
                />
              </div>
            ))}
          </div>

          <Link to="/shop/accessories">
            <p
              style={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
                textDecoration: 'underline solid #000',
                cursor: 'pointer',
                textDecorationSkipInk: 'none',
                color: '#000',
              }}
            >
              View all products
            </p>
            <div className={home.line}></div>
          </Link>
        </section>
      </div>
      {/* END sections: Intro products */}

      {/* BEGIN sections: EXPOLORE  */}
      <div className={home.explore}>
        <h2>EXPLORE #NABCOFFEESHOP</h2>
        <div className={home.girdlayout}>
          {ExploreData.map((item, index) => (
            <img src={item.src} alt={`Coffee product ${index}`} key={index} />
          ))}
        </div>
      </div>

      {/* END sections: EXPOLORE  */}

      {/* START sections: BLOG  */}
      <div className={home.blog}>
        <div className={home.line}></div>
        <h2>BLOG POST</h2>
        <div className={home.blog__card}>
          {BlogData.map((item, index) => (
            <div key={index}>
              <img src={item.src} alt="" />
              <p>
                <FontAwesomeIcon icon={faCalendar} /> {item.date}
              </p>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      {/* END sections: BLOG  */}
    </>
  );
}

export default Home;
