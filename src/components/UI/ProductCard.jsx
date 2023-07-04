import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/product-card.css';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
const ProductCard = ({item}) => {
  return (
    <Col lg='3' md='4' className='mb-2'>
        <div className="product__item">
            <div className="product__img">
                <motion.img 
                whileHover={{scale: 0.9}}
                src={item.imgUrl} alt="" />
            </div>
            <div className='p2 product__info'>
                <h3 className="product__name">
                    <Link to={`/shop/${item.id}`}>
                        {item.productName}
                    </Link>
                </h3>
                <span>{item.category}</span>
            </div>
            <div className="product__card-bottom
            d-flex align-items-center justify-content-between p-1">
                <span className="price">&#8377; {item.price}</span>
                <motion.span
                whileTap={{scale: 1.2}}>
                    <i class="ri-add-fill"></i>
                </motion.span>
            </div>
        </div>
    </Col>
  )
}

export default ProductCard