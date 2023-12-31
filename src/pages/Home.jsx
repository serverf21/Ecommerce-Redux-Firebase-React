import React, {useState, useEffect} from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img.png'
import '../styles/home.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Services from '../services/Services';
import ProductsList from '../components/UI/ProductsList';
import products from '../assets/data/products'
import counterImg from '../assets/images/counter-timer-img.png'
import Clock from '../components/UI/Clock';

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const year = new Date().getFullYear();
  useEffect(() => {
    const filterTrendingProducts = products.filter((item)=> 
      item.category === 'chair');

      const filterBestSalesProducts = products.filter((item)=> 
      item.category === 'sofa');

      const filterMobileProducts = products.filter((item)=> 
      item.category === 'mobile');

      const filterWirelessProducts = products.filter((item)=> 
      item.category === 'wireless');

      const filterPopularProducts = products.filter((item)=> 
      item.category === 'watch');

      setTrendingProducts(filterTrendingProducts);
      setBestSalesProducts(filterBestSalesProducts);
      setMobileProducts(filterMobileProducts);
      setWirelessProducts(filterWirelessProducts);
      setPopularProducts(filterPopularProducts);
  }, []);
  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <p className="hero__subtitle">
                  Trending product in {year}
                </p>
                <h1>Make Your Interior Minimalistic!</h1>
                <p>We at best buy makes sure that you get modernistic and chosen interior decoratives for your home.</p>

                <motion.button className='buy__btn'
                whileTap={{scale: 1.4}}>
                  <Link to='/shop'>
                    SHOP NOW
                  </Link>
                </motion.button>
              </div>
            
            </Col>
            <Col lg='6' md='6'>
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg='12' className="text-center">
              <h2 className='section__title'>
                Trending Products
              </h2>
            </Col>
            <ProductsList data={trendingProducts} />
          </Row>
        </Container>
      </section>
      <section className="best__sales">
      <Container>
          <Row>
            <Col lg='12' className="text-center">
              <h2 className='section__title'>
                Best Sales
              </h2>
            </Col>
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg='6' md='12' className='count__down-col'>

              <div className="clock__top-content">
                <h4 className='text-white fs-6 mb-2'>Limited offers</h4>
                <h3 className='text-white fs-4 mb-3'>Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button
              whileTap={{scale: 1.2}}
              className='buy__btn store__btn'>
                <Link to='/shop'>
                Visit Store 
                </Link>
              </motion.button>
            </Col>
            <Col lg='6' md='12' className='text-end counter__img'>
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="new__arrivals">
          <Container>
            <Row>
            <Col lg='12' className="text-center mb-5">
              <h2 className='section__title'>
                New Arrivals
              </h2>
            </Col> 
            <ProductsList data={mobileProducts} /> 
            <ProductsList data={wirelessProducts} /> 
            </Row>
          </Container>
        </section>

        <section className="popular__category">
          <Container>
              <Row>
              <Col lg='12' className="text-center mb-5">
                <h2 className='section__title'>
                  Popular in Category
                </h2>
              </Col> 
              <ProductsList data={popularProducts} /> 
              </Row>
            </Container>
        </section>
    </Helmet>
  )
}

export default Home