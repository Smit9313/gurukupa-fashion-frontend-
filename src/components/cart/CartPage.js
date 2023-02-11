import React,{useEffect} from 'react';
import Header from './Header';
import ProductsData from './Products';
import PromoCode from './PromoCode';
import ProductList from './ProductList';
import Summary from './Summary';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function CartPage() {
    const CLONE_PRODUCTS = JSON.parse(JSON.stringify(ProductsData));
    const [products, setProducts] = React.useState(CLONE_PRODUCTS);
    const [promoCode, setPromoCode] = React.useState("");
    const [discountPercent, setDiscountPercent] = React.useState(0);
    const history = useHistory();



     useEffect(() => {
       const token = sessionStorage.getItem("token");
       const headers = { Authorization: `Bearer ${token}` };
       try {
         axios
           .get(
             "http://127.0.0.1:8000/cart/",
             { headers }
           )
           .then((response) => {
        
                console.log(response.data)

           })
           .catch((error) => {
             console.log(error);
           });
       } catch (err) {}
     }, []);






    const itemCount = products.reduce((quantity, product) => {
        return quantity + +product.quantity;
    }, 0);
    const subTotal = products.reduce((total, product) => {
        return total + product.price * +product.quantity;
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
        cloneProducts[index].quantity = parseInt(cloneProducts[index].quantity) + 1;
        setProducts(cloneProducts);
    }

    const onRemoveQty = (index) =>{
        const cloneProducts = [...products];
        if (cloneProducts[index].quantity > 1){
            cloneProducts[index].quantity =
            parseInt(cloneProducts[index].quantity) - 1;
        }
        setProducts(cloneProducts);
    }

    const onRemoveProduct = (i) => {
        const filteredProduct = products.filter((product, index) => {
            return index !== i;
        });

        setProducts(filteredProduct);
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
          <Header itemCount={itemCount} />

          {products.length > 0 ? (
              <div>
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
          ) : (
              <div className="empty-product">
                  <h3>There are no products in your cart.</h3>
                  <button onClick={() => {
                    setProducts(ProductsData)
                    history.push('/shop');
                    }}>Shopping now</button>
              </div>
          )}
      </div>
  )
}

export default CartPage