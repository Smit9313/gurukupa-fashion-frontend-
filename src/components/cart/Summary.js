import React from 'react';
import './summary.css';

function Summary({
    subTotal,
    discount,
    tax,
    onEnterPromoCode,
    checkPromoCode
}) {

    const total = subTotal - discount + tax;

  return (
      <section className="container">
          <div className="promotion">
              <label htmlFor="promo-code">Have A Promo Code?</label>
              <input type="text" onChange={onEnterPromoCode} />
              <button type="button" onClick={checkPromoCode} />
          </div>

          <div className="summary">
              <ul>
                  <li>
                      Subtotal <span>{subTotal}</span>
                  </li>
                  {discount > 0 && (
                      <li>
                          Discount <span>{discount}</span>
                      </li>
                  )}
                  <li>
                      Tax <span>{tax}</span>
                  </li>
                  <li className="total">
                      Total <span>{total}</span>
                  </li>
              </ul>
          </div>

          <div className="checkout">
              <button type="button">Check Out</button>
          </div>
      </section>
    )
}

export default Summary