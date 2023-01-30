import "./App.css";
import React,{useState} from "react";
import Navbar from "./components/navbar/Navbar";
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
import Profile from "./routes/Profile";
import Order from "./admin panel/routes/Order";


function App() {

  // const [user, setUser] = useState(sessionStorage.getItem("token"));

  return (
    <div className="App">
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signup" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/footer" component={Footer} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/single-product" component={SingleProduct} />
        <Route exact path="/cart-products" component={CartProducts} />
        <Route exact path="/checkout" component={Checkout} />

        <Route path="/admin" component={Admin}/>
          {/* <Route path="/order" component={Order} />
        </Route> */}

        <Route path="/profile" component={Profile} />
        <Route path="/*" component={Error} />
        {/* <Route path="/*" component={Error} /> */}
      </Switch>
    </div>
  );
}

export default App;
