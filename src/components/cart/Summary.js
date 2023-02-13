import React from 'react';
import { useHistory } from 'react-router-dom';
import './summary.css';

function Summary({
    subTotal,
    discount,
    tax,
    onEnterPromoCode,
    checkPromoCode
}) {

    const history = useHistory();
    const total = subTotal

  return (
    <section className="container">
      {/* <div className="promotion">
        <label htmlFor="promo-code">Have A Promo Code?</label>
        <input type="text" onChange={onEnterPromoCode} />
        <button type="button" onClick={checkPromoCode} />
      </div> */}

      <div className="summary">
        <ul>
          <li className="total">
            Total <span>{parseFloat(total).toFixed(2)}</span>
          </li>
        </ul>
      </div>

      <div className="checkout">
        <button type="button" onClick={()=>history.push('/checkout')}>Check Out</button>
      </div>
      
    </section>
  );
}

export default Summary