import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase.config';
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { storage } from '../firebase.config';
import {toast} from 'react-toastify';
import {setDoc, doc} from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async(e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
    
      await uploadTask.then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
    
        await updateProfile(user, {
          displayName: name,
          photoURL: downloadURL,
        });
    
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          displayName: name,
          email,
          photoURL: downloadURL,
        });
    
        toast.success('Account created successfully!');
        navigate('/login');
      });
    } catch (error) {
      toast.error(`${error.code}: ${error.message}`);
    }

    
      setLoading(false);
  }

  return <Helmet title="Signup">
    <section>
      <Container>
        <Row>
          {
            loading ? 
            <Col lg='12' className='text-center'>
              <h4 className='fw-bold'>Loading.......</h4>
            </Col>
            :
            <Col lg='6' className='d-flex align-items-center justify-content-center flex-column m-auto'>
            <h3 className='fw-bold fs-4 mb-3'>Sign Up</h3>

            <Form className='auth__form' onSubmit={signup}>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Username'
                value={name} onChange={e => setName(e.target.value)} />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="email" placeholder='Enter your email'
                value={email} onChange={e => setEmail(e.target.value)} />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="password" placeholder='Enter your password'
                value={password} onChange={e=>setPassword(e.target.value)} />
              </FormGroup>

              <FormGroup className='form__group'>
                <input type="file" onChange={e=>setFile(e.target.files[0])} />
              </FormGroup>

              <button
              type="submit"
              className="buy__btn login__btn">Create an Account</button>
              <p>Already have an account?
                <Link to='/login'> Login to existing account</Link>
              </p>
            </Form>
          </Col>
          }
          
        </Row>
      </Container>
    </section>

  </Helmet>
}

export default Signup;