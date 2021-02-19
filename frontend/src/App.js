import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <main className="py-3">
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomeScreen}></Route>
            <Route exact path="/product/:id" component={ProductScreen}></Route>
          </Switch>
        </div>
      </main>
      <Footer></Footer>
    </Router>
  );
};

export default App;
