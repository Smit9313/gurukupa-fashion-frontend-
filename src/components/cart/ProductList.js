import React from 'react';
import './productlist.css';
import { InputNumber } from "antd";

function ProductList({ products, onChangeProductQuantity, onRemoveProduct ,onAddQty, onRemoveQty }) {

    const onChange = (value) => {
      console.log("changed", value);
    };



  return (
      <section className="container">
          <ul className="products">
              {products.map((product, index) => {
                  return (
                    <li className="row" key={index}>
                      <div className="col left">
                        <div className="thumbnail">
                          <img
                            src={product.image}
                            alt={product.name}
                            height="150"
                            width="135"
                          />
                        </div>
                        <div className="detail">
                          <div className="name_cart">
                            <a href="/">{product.name}</a>
                          </div>
                          <div className="description">
                            {product.description}
                          </div>
                          <div className="price">{product.price}</div>
                        </div>
                      </div>

                      <div className="col right">
                        <div className="quantity">
                          <button className="button-133" onClick={() => onRemoveQty(index)}>-</button>
                          <input
                            type="text"
                            className="quantity"
                            step="1"
                            value={product.quantity}
                            onChange={(event) =>
                              onChangeProductQuantity(index, event)
                            }
                          />
                          <button className="button-133" onClick={() => onAddQty(index)}>+</button>
                        </div>

                        <div className="remove">
                          <i
                            className="bx bx-x remove-icon"
                            onClick={() => onRemoveProduct(index)}></i>
                        </div>
                      </div>
                    </li>
                  );
              })}
          </ul>
      </section>
  )
}

export default ProductList