import React, { useState, useEffect } from "react";
import Header from "./Header";
import ProductsData from "./Products";
import PromoCode from "./PromoCode";
import ProductList from "./ProductList";
import Summary from "./Summary";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./cartpage.css";
import { isEmpty } from "lodash";
import Navbar from "../navbar/Navbar";

function CartPage() {
  const [products, setProducts] = useState(undefined);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = React.useState(0);
  const [navrender, setNavRender] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .get("http://127.0.0.1:8000/cart/", { headers })
        .then((response) => {
          if (response.data.message === "Success!") {
            setProducts(response.data.data);
            console.log(response.data)
          } else if (
            response.data.message === "Token corrupted." ||
            response.data.message === "Cart is empty." ||
            response.data.message === "Cart is empty."
          ) {
            setProducts(undefined);
          } else {
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  }, []);

  const itemCount =
    products !== undefined &&
    products.reduce((qty, product) => {
      return qty + +product.qty;
    }, 0);

  const subTotal =
    products !== undefined &&
    products.reduce((total, product) => {
      return total + product.prod_price * +product.qty;
    }, 0);
  const discount = (subTotal * discountPercent) / 100;

  const onChangeProductQuantity = (index, event) => {
    const value = event.target.value;
    const valueInt = parseInt(value);
    const cloneProducts = [...products];

    // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
    if (value === "") {
      cloneProducts[index].quantity = value;
    } else if (valueInt > 0 && valueInt < 100) {
      cloneProducts[index].quantity = valueInt;
    }
    setProducts(cloneProducts);
  };

  const onAddQty = (index) => {
    const cloneProducts = [...products];
    cloneProducts[index].qty = parseInt(cloneProducts[index].qty) + 1;
    setProducts(cloneProducts);

    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .patch(
          "http://127.0.0.1:8000/cart/",
          {
            prod_id: cloneProducts[index].prod_id,
            prod_qty: {
              [cloneProducts[index].size]: cloneProducts[index].qty,
            },
          },
          { headers }
        )
        .then((response) => {
          //  console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  };

  const onRemoveQty = (index) => {
    const cloneProducts = [...products];
    if (cloneProducts[index].qty > 1) {
      cloneProducts[index].qty = parseInt(cloneProducts[index].qty) - 1;
    }
    setProducts(cloneProducts);

    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .patch(
          "http://127.0.0.1:8000/cart/",
          {
            prod_id: cloneProducts[index].prod_id,
            prod_qty: {
              [cloneProducts[index].size]: cloneProducts[index].qty,
            },
          },
          { headers }
        )
        .then((response) => {
          //  console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  };

  const onRemoveProduct = (i) => {
    const cloneProducts = [...products];

    const filteredProduct = products.filter((product, index) => {
      return index !== i;
    });

    const token = sessionStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      axios
        .delete("http://127.0.0.1:8000/cart/", {
          data: {
            prod_id: cloneProducts[i].prod_id,
            prod_qty: {
              [cloneProducts[i].size]: cloneProducts[i].qty,
            },
          },
          headers,
        })
        .then((response) => {
          setProducts(filteredProduct);
          setNavRender(!navrender);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
  };

  const onEnterPromoCode = (event) => {
    setPromoCode(event.target.value);
  };

  const checkPromoCode = () => {
    for (var i = 0; i < PromoCode.length; i++) {
      if (promoCode === PromoCode[i].code) {
        setDiscountPercent(parseFloat(PromoCode[i].discount.replace("%", "")));
        return;
      }
    }
    alert("Sorry, the Promotional code you entered is not valid!");
  };
  const TAX = 5;

  return (
    <div>
      <Navbar navrender={navrender} />
      {isEmpty(products) ? (
        <>
          <div className="empty-product">
            <h3>There are no products in your cart.</h3>
            <button
              onClick={() => {
                // setProducts(ProductsData)
                history.push("/shop");
              }}>
              Shopping now
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <Header itemCount={itemCount} />

            <ProductList
              products={products}
              onChangeProductQuantity={onChangeProductQuantity}
              onRemoveProduct={onRemoveProduct}
              onAddQty={onAddQty}
              onRemoveQty={onRemoveQty}
            />

            <Summary
              subTotal={subTotal}
              discount={discount}
              tax={TAX}
              onEnterPromoCode={onEnterPromoCode}
              checkPromoCode={checkPromoCode}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
