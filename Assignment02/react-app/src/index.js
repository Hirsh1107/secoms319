import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Products } from './Products';


function App() {
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [searchTerm, setSearchTerm] = useState('');
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

  return (
    <div>
      <h1>Store Assignment 2</h1>
      <h2>Products: {Products.length}</h2>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search products" />
        <button type="submit">Search</button>
      </form>
      <div className="grid-container">
        {ProductsCategory.map((product, i) => (
          <div className="grid-item">
          <img src={product.img_src} alt={product.title} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
          {quantity_picker()}
          <button>Add to Cart</button>
        </div>
        ))}
      </div>
      <button>Shop Now</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));