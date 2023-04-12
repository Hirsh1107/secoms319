import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Products } from './Products';
import './styles.css';
import "bootstrap/dist/css/bootstrap.css"

import crocs from "./images/crocs.jpg"; 
import basketball from "./images/basketball_shoes.jpg"; 
import boots from "./images/boots.jpg"; 
import converse from "./images/converse.jpg"; 
import sandals from "./images/sandals.jpg"; 
import tennis from "./images/tennis_shoes.jpg"; 
const images = {
  "crocs": crocs,
  "basketball": basketball,
  "boots": boots,
  "converse": converse,
  "sandals": sandals,
  "tennis": tennis
}

function App() {
  const [ProductsList, setProductsList] = useState(Products);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [countList, setCountList] = useState(Array(Products.length).fill(1));


  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
    
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    // Perform search logic here
    const results = ProductsList.filter(eachProduct => {
      if (searchTerm === "") return ProductsList;
      return eachProduct.title.toLowerCase().includes(searchTerm.toLowerCase())
    });
    setProductsList(results);
  }

  function QuantityPicker(props) {
    const i = props.i;

    function increment() {
      const updatedCountList = [...countList];
      updatedCountList[i]++;
      setCountList(updatedCountList);
    }
    function decrement() {
      const updatedCountList = [...countList];
      updatedCountList[i]--;
      if(updatedCountList[i] < 1) {
        updatedCountList[i] = 1;
      }
      setCountList(updatedCountList);
    }

    return (
      <div class = "qty-picker">
        <p>{countList[i]}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    )
  }

  function handleAddToCart(product) {
    const count = countList[product.id - 1];
    const existingCartItemIndex = cartItems.findIndex(
      item => item.product.id === product.id
    );
    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex].quantity += count;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { product: product, quantity: count }]);
    }
  }
  
  function handleCartViewRequested() {
    setShowCart(true);
  }

  function handleCartViewDismissed() {
    setShowCart(false);
  }

  return (
    <div>
      {showCart ? 
        (
        <CartView
        cartItems={cartItems}
        OnCartViewDismissed={handleCartViewDismissed} />
        ) :

        (
          <div>
            <div class="container">
              <h1>Store Assignment 2</h1>
              <h2>Products: {Products.length}</h2>
              <button onClick={handleCartViewRequested}>View Cart ({cartItems.length})</button>

              <div class="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-end">
                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={handleSearchSubmit}>
                  <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search products" />
                  <button type="submit">Search</button>
                </form>
              </div>
            </div>

            <div className="grid-container">
              {ProductsList.map((product, index) => (
                <div className="grid-item">
                <img src={images[product.img_src]} alt={product.title} className = "product-img" />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
                {<QuantityPicker i={index}/>}
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
}

function CartView(props) {
  const {cartItems, OnCartViewDismissed } = props;
  const subtotal = cartItems.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div>
    <h1>Cart</h1>
    <button onClick={OnCartViewDismissed}>Return</button>
    {cartItems.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      <>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.product.title} - {item.quantity} x ${item.product.price}
            </li>
          ))}
        </ul>
        <p>
          Subtotal: ${subtotal.toFixed(2)}
        </p>
        <p>
          Tax: ${tax.toFixed(2)}
        </p>
        <p>
          Total: ${total.toFixed(2)}
        </p>
        <button onClick={props.onCheckoutRequested}>Checkout</button>
      </>
    )}
  </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
