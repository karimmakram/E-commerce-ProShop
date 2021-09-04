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
import ProductList from './components/screen/ProductList'
import ProfileScreen from './components/screen/ProfileScreen'
import ShippingScreen from './components/screen/ShippingScreen'
import PaymentScreen from './components/screen/PaymentScreen'
import PlaceOrderScreen from './components/screen/PlaceOrderScreen'
import UserListScreen from './components/screen/UserListScreen'
import UserEditScreen from './components/screen/UserEditScreen'
import OrederListScreen from './components/screen/OrderListScreen'
import OrderScreen from './components/screen/OrderScreen'
function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/order/:id?' component={OrderScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/productlist' component={ProductList} />
          <Route path='/admin/orderlist' component={OrederListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
