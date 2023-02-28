import "./App.css";
import React,{useState, useEffect } from "react";
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
import Profile from "./routes/Profile";
import ForgotPassword from "./routes/ForgotPassword";
import ChangePassword from "./routes/ChangePassword";
import jwtDecode from "jwt-decode";
import Invoice from "./routes/Invoice";
import Megic from "./routes/Megic";
import Model from "./routes/Model";
import { Mode } from "@mui/icons-material";



function App() {

  const user = sessionStorage.getItem("token");
  const [role, setRole] = useState("");


  
  useEffect(() => {

     if (sessionStorage.getItem("token") !== null) {
       const decoded = jwtDecode(user);
       setRole(decoded["id"]["role"]);
     }

  }, [role,user])

  return (
    <div className="App">
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home" component={Home} />
        <Route exact path="/shop">
          <Redirect to="/shop/all" />
        </Route>
        <Route exact path="/shop/:id" component={Shop} />
        <Route exact path="/shop/:cat/:subcat" component={Shop} />
        <Route exact path="/shop/:kid/:kidcat/:kidsubcat" component={Shop} />
        <Route
          exact
          path="/single-product/:product_id"
          component={SingleProduct}
        />
        {/* <Route exact path="/about" component={About} /> */}
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signup" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/footer" component={Footer} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/cart-products" component={CartProducts} />
        <Route exact path="/megic" component={Megic} />
        <Route exact path="/model" component={Model} />
        <Route exact path="/forgotpassword" component={ForgotPassword} />
        <Route exact path="/resetpassword/:key" component={ChangePassword} />
        {user && role === "admin" && (
          <>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route exact path="/checkout" component={Checkout} />
              <Route path="/profile" component={Profile} />
              <Route path="/*" component={Error} />
            </Switch>
          </>
        )}
        {user && role === "customer" && (
          <>
            <Switch>
              <Route path="/profile" component={Profile} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/invoice/:order_id" component={Invoice} />
              <Route path="/*" component={Error} />
            </Switch>
          </>
        )}

        <Route path="/*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
