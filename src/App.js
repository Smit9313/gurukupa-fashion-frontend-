import "./App.css";
import React from "react";
// import Navbar from "./components/navbar/Navbar";
import Home from "./routes/Home";
import Shop from "./routes/Shop";
import Contact from "./routes/Contact";
import About from "./routes/About";
import Login from "./routes/Login";
import Footer from "./routes/Footer";
import Register from "./routes/Register"
import { Switch, Route, Redirect } from "react-router-dom";
import SingleProduct from "./routes/SingleProduct";
import CartProducts from "./routes/CartProducts";
import Error from "./routes/Error";
import Admin from "./admin panel/Admin";
import Checkout from "./routes/Checkout";


function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/signup" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/footer" component={Footer} />
        <Route path="/register" component={Register} />
        <Route path="/single-product" component={SingleProduct} />
        <Route path="/cart-products" component={CartProducts} />
        <Route path="/checkout" component={Checkout}/>
        <Route path="/admin" component={Admin} />
        <Route path="/*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
