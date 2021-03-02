import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import CartScreen from "./screens/CartScreen/CartScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import OrderListScreen from "./screens/OrderListScreen/OrderListScreen";
import OrderScreen from "./screens/OrderScreen/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen/ProductListScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen/ShippingScreen";
import UserEditScreen from "./screens/UserEditScreen/UserEditScreen";
import UserListScreen from "./screens/UserListScreen/UserListScreen";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <div className="container">
          <Switch>
            <Route exact path="/search/:keyword" component={HomeScreen}></Route>
            <Route exact path="/" component={HomeScreen}></Route>
            <Route exact path="/product/:id" component={ProductScreen}></Route>
            <Route path="/cart/:id?" exact component={CartScreen}></Route>
            <Route path="/login" exact component={LoginScreen}></Route>
            <Route exact path="/register" component={RegisterScreen}></Route>
            <Route exact path="/profile" component={ProfileScreen}></Route>
            <Route exact path="/shipping" component={ShippingScreen}></Route>
            <Route exact path="/payment" component={PaymentScreen}></Route>
            <Route
              exact
              path="/placeorder"
              component={PlaceOrderScreen}
            ></Route>
            <Route exact path="/order/:id" component={OrderScreen}></Route>
            <Route
              exact
              path="/admin/userlist"
              component={UserListScreen}
            ></Route>
            <Route
              exact
              path="/admin/productlist"
              component={ProductListScreen}
            ></Route>
            <Route
              exact
              path="/admin/user/:id/edit"
              component={UserEditScreen}
            ></Route>
            <Route
              exact
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            ></Route>
            <Route
              exact
              path="/admin/orderlist"
              component={OrderListScreen}
            ></Route>
          </Switch>
        </div>
      </main>
      <Footer></Footer>
    </Router>
  );
};

export default App;
