import React from 'react';
import '../Style/category.css';

function Category() {
  return (
    <>
      <div className="category-container">
        <div className="sub-category-container">
          <div className="category-1">
            <h3>Man</h3>
            <hr />
            <p>T-Shirt</p>
            <p>Jeans</p>
            <p>Casual Shirt </p>
            <p>Formal Shirt</p>
            <p>Shorts</p>
            <p>Casual Trouser</p>
            <p>Kurta</p>
          </div>

          <div className="category-1">
            <div>
              <h3>Woman</h3>
              <hr />
              <p>Dress</p>
              <p>Tops</p>
              <p>T-Shirts</p>
              <p>Jeans</p>
              <p>Kurtas & Suits</p>
            </div>
          </div>

          <div>
            <div className="category-2">
              <center>
                <h3>Kid</h3>
              </center>
              <hr />
            </div>
            <div className="sub-category-container">
              <div className="category-1">
                <h4>Boy</h4>
                <hr />
                <p>T-Shirts</p>
                <p>Shirts</p>
                <p>Shorts</p>
                <p>Jeans</p>
                <p>Trousers</p>
              </div>
              <div>
                <h4>Girl</h4>
                <hr />
                <p>Dresses</p>
                <p>Tops</p>
                <p>T-Shirts</p>
                <p>Jeans &<br/>Trousers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category