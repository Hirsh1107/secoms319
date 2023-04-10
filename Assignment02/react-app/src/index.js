import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    // Perform search logic here
  }

  return (
    <div>
      <h1>Store Assignment 2</h1>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search products" />
        <button type="submit">Search</button>
      </form>
      <div className="grid-container">
        <div className="grid-item">
          <img src="" alt="Product 1" />
          <h2>Product 1</h2>
          <p>Price</p>
          <button>Add to Cart</button>
        </div>
        <div className="grid-item">
          <img src="" alt="Product 2" />
          <h2>Product 2</h2>
          <p>Price</p>
          <button>Add to Cart</button>
        </div>
        <div className="grid-item">
          <img src="" alt="Product 3" />
          <h2>Product 3</h2>
          <p>Price</p>
          <button>Add to Cart</button>
        </div>
        <div className="grid-item">
          <img src="" alt="Product 4" />
          <h2>Product 4</h2>
          <p>Price</p>
          <button>Add to Cart</button>
        </div>
        <div className="grid-item">
          <img src="" alt="Product 5" />
          <h2>Product 5</h2>
          <p>$Price</p>
          <button>Add to Cart</button>
        </div>
        <div className="grid-item">
          <img src="" alt="Product 6" />
          <h2>Product 6</h2>
          <p>Price</p>
          <button>Add to Cart</button>
        </div>
      </div>
      <button>Shop Now</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));