import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Products } from './Products';
import './styles.css';
import "bootstrap/dist/css/bootstrap.css"


function App() {
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  let [count, setCount] = useState(0);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
    const results = ProductsCategory.filter(eachProduct => {
      if (event.target.value === "") return ProductsCategory;
      return eachProduct.title.toLowerCase().includes(event.target.value.toLowerCase())
    });
    setProductsCategory(results);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    // Perform search logic here

  }

  function increment() {
    count++;
    setCount(count);
  }
  function decrement() {
    count--;
    if(count < 0) {
      count = 0;
    }
    setCount(count);
  }

  function quantity_picker() {
    return (
      <div>
        <p>{count}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </div>
    )
  }

  function handleAddToCart(product) {
    const existingCartItemIndex = cartItems.findIndex(
      item => item.product.id === product.id
    );
    if (existingCartItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex].quantity++;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { product: product, quantity: 1 }]);
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
              <button onClick={handleCartViewRequested}>View Cart</button>

              <div class="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-end">
                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={handleSearchSubmit}>
                  <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search products" />
                  <button type="submit">Search</button>
                </form>
              </div>
            </div>

            <div className="grid-container">
              {ProductsCategory.map((product, i) => (
                <div className="grid-item">
                <img src={product.img_src} alt={product.title} />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>${product.price}</p>
                {quantity_picker()}
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
              {item.product.name} - {item.quantity} x ${item.product.price}
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