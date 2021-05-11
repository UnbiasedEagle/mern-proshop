import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderListPage from './pages/OrderListPage';
import OrderPage from './pages/OrderPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ProductEditPage from './pages/ProductEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import ShippingPage from './pages/ShippingPage';
import UserEditPage from './pages/UserEditPage';
import UserListPage from './pages/UserListPage';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    const getStripeApiKey = async () => {
      const { data } = await axios.get('/api/payments/stripeapi/key');

      setStripeApiKey(data.stripeApiKey);
    };

    getStripeApiKey();
  }, []);
  return (
    <Router>
      <Header></Header>
      <main className='py-3'>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={HomePage}></Route>
            <Route exact path='/search/:keyword' component={HomePage}></Route>
            <Route exact path='/page/:page' component={HomePage}></Route>
            <Route
              exact
              path='/search/:keyword/page/:page'
              component={HomePage}
            ></Route>
            <Route exact path='/product/:id' component={ProductPage}></Route>
            <Route exact path='/cart/:id?' component={CartPage}></Route>
            <Route exact path='/login' component={LoginPage}></Route>
            <Route exact path='/register' component={RegisterPage}></Route>
            <Route exact path='/profile' component={ProfilePage}></Route>
            <Route exact path='/shipping' component={ShippingPage}></Route>
            <Route exact path='/payment' component={PaymentPage}></Route>
            <Route exact path='/placeorder' component={PlaceOrderPage}></Route>
            <Route
              exact
              path='/order/:id'
              render={(props) =>
                stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <OrderPage {...props}></OrderPage>
                  </Elements>
                )
              }
            ></Route>
            <Route
              exact
              path='/admin/userlist'
              component={UserListPage}
            ></Route>
            <Route
              exact
              path='/admin/orderlist'
              component={OrderListPage}
            ></Route>
            <Route
              exact
              path='/admin/productlist'
              component={ProductListPage}
            ></Route>
            <Route
              exact
              path='/admin/productlist/:page'
              component={ProductListPage}
            ></Route>
            <Route
              exact
              path='/admin/user/:id/edit'
              component={UserEditPage}
            ></Route>
            <Route
              exact
              path='/admin/product/:id/edit'
              component={ProductEditPage}
            ></Route>
          </Switch>
        </div>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
