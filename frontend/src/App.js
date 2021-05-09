import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './components/screen/HomeScreen'
import ProductScreen from './components/screen/ProductScreen'
import CartScreen from './components/screen/CartScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginScreen from './components/screen/LoginScreen'
import RegisterScreen from './components/screen/RegisterScreen'
import ProfileScreen from './components/screen/ProfileScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
