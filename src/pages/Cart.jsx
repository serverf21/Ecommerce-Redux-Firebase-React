import React from 'react';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {

  const cartItems = useSelector(state => 
    state.cart.cartItems);
    const totalAmount = useSelector(state =>
      state.cart.totalAmount);
  return (<Helmet title='Cart'>
    <CommonSection title='Shopping Cart' />
      <section>
        <Container>
          <Row>
            <Col lg='9'>

              {
                cartItems.length === 0 ? (<h2 className='fs-4 text-center'>No items added</h2>)
                :
                (
                  <table className='table bordered'>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Delete</th>
                      </tr>
                    </thead>

                    <tbody>
                      {
                        cartItems.map((item, index) => (
                          <Tr item={item} index={index}/>
                        ))
                      }
                    </tbody>
                  </table>
                )
              }
              
            </Col>
            <Col lg='3'>
              <div className='mb-2'>
                <h6 className='d-flex align-items-center
                justify-content-between'>
                  Subtotal -
                  <span className='fs-3 fw-bold'>&#8377; {totalAmount}</span>
                </h6>
                
              </div>
              <p className='fs-6 my-2'>Taxes and Shipping will be calculated in checkout.</p>
              <div>

                <button className='buy__btn w-100'>
                  <Link to='/checkout'>
                    Checkout
                  </Link>
                </button>

                <button className='buy__btn w-100 mt-3'>
                  <Link to='/shop'>
                    Continue Shopping
                  </Link>
                </button>

              </div>
            </Col>
          </Row>
        </Container>
      </section>
  </Helmet>);
}

const Tr = ({item, index}) => {
  const dispatch = useDispatch();
  const deleteProducts = () => {
    dispatch(cartActions.deleteItem(item.id));
  }
  return (
    <tr key={index}>
      <td><img src={item.imgUrl} alt="" /></td>
      <td>{item.productName}</td>
      <td>&#8377; {item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.i
        whileTap={{scale: 1.2}}
        class="ri-delete-bin-line"
        onClick={deleteProducts}
        ></motion.i>
      </td>
    </tr>
  );
}

export default Cart