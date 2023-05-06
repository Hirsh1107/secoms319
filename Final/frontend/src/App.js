import { useState, useEffect } from 'react';
import logo from './images/logo.jpg'
import bar from './images/bar.jpg'
import './App.css'

function App() {
  const [product, setProduct] = useState([]);
  const [view, setView] = useState(1); // 1 - main, 2 - menu, ...
  const [cartItems, setCartItems] = useState([]);

  function handleViewChange(viewnum) {
    setView(viewnum);
  }

  function getAllProducts() {
    fetch("http://localhost:4000/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show Catalog of Products :");
      console.log(data);
      setProduct(data);
    });
    handleViewChange(2);
  }

  const showAllItems = product.map((el) => (
    <div key={el._id} class='row'>
      <div>
        <img src={el.image} width="100px" alt={el.title}/>
      </div>
      <h3>
        Title: {el.title} <br />
        Category: {el.category} <br />
        Price: {el.price} <br />
      </h3>
    </div>
  ));

  //https://www.davenportredlantern.com/ current website for ideas
  function getView() {
    switch (view) {
      case 1:
        return (
          <div>
            <h1>Main view with restaurant details</h1> 
          </div>
        );

        case 2: 
          return (
            <div>
              <h1>Menu view</h1>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {showAllItems}
              </div>
            </div>
          );

        case 3:
          return (
            <div>
              <h1>Contact page</h1> 
            </div>
          )
    }
  }

  return (
    <div>
      <img src={logo} alt="logo" width="20%" class="logo"></img>
      <div class="main-view">
        <div style={{ height: '125px' }}></div>
        <div class="navigator">
          <button onClick={() => handleViewChange(1)}>Home</button>
          <button onClick={() => getAllProducts()}>Menu</button>
          <button onClick={() => handleViewChange(3)}>Contact Us</button>
        </div>
        {getView()}

      </div>
    </div>
  );
}

export default App;
