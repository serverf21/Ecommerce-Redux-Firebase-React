import React, {useRef, useEffect, useState} from 'react'
import './header.css'
import logo from '../../assets/images/eco-logo.png'
import { Container, Row } from 'reactstrap'
import {NavLink, useNavigate} from 'react-router-dom'
import userIcon from '../../assets/images/user-icon.png'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { Link } from 'react-router-dom'
import {signOut} from "firebase/auth";
import {auth} from "../../firebase.config"
import { toast } from 'react-toastify'
const nav__link = [{
  path: 'home',
  display: 'Home'
},
{
  path: 'shop',
  display: 'Shop'
},
{
  path: 'cart',
  display: 'Cart'
}];
 
const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const {currentUser} = useAuth();
  const [showProfileActions, setShowProfileActions] = useState(false);
  const profileActionsRef = useRef(null);

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if(document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80){
          headerRef.current.classList.add('sticky__header');
        } else {
          headerRef.current.classList.remove('sticky__header');
        }
    })
  }

  const logout = () => {
    signOut(auth).then(() =>{
      toast.success('Logged Out!');
      navigate("/home");
    }).catch(err=>{
      toast.error(err.message);
    })
  }

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  });
  
  const navigateToCart = () => {
    navigate('/cart');
  }

  // const toggleProfileActions = () => profileActionsRef.current.classList.toggle('show__profileActions');
  const toggleProfileActions = () => {
    setShowProfileActions((prevState) => !prevState);
  };
  const menuToggle = () => menuRef.current.classList.toggle('active__menu');
  return (
    <header className='header' ref={headerRef}>
      <Container>
        <Row>
          <div className='nav__wrapper'>
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Buy Busy</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__link.map((item, index)=>(
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path}
                    className={(navClass) =>
                    navClass.isActive ? 'nav__active' : ''}>
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span class='fav__icon'>
                <i class="ri-heart-line"></i>
                <span className="badge">1</span>
              </span>
              <span className="cart__icon" onClick={navigateToCart}>
                <i class="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className='profile'>
                <motion.img
                whileTap={{scale: 1.5}}
                src={currentUser ? currentUser.photoURL : userIcon}
                alt=""
                onClick={toggleProfileActions}
                />
                <div className={showProfileActions ? 'show__profileActions' : 'profile__actions'}
                ref={profileActionsRef}
                onClick={toggleProfileActions}>
                  {
                    currentUser ? (<span onClick={logout}>Logout</span>) :
                    (<div className='d-flex align-items-center justify-content-center
                    flex-column'>
                      <Link to='/signup'>Signup</Link>
                      <Link to='/login'>Login</Link>
                    </div>)
                  }
                </div>
                
              </div>
              <div className="mobile__menu">
              <span onClick={menuToggle}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
            </div>
            
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header