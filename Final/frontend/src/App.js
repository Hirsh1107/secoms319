import { useState, useEffect } from 'react';
import logo from './images/logo.jpg'
import bar from './images/bar.jpg'
import './App.css'

function App() {
  const [product, setProduct] = useState([]);
  const [view, setView] = useState(1); // 1 - main, 2 - menu, ...
  const [cartItems, setCartItems] = useState([]);

  function handleViewChange(viewnum) {
    if (viewnum == 2) {
      getAllProducts();
    }
    setView(viewnum);
  }

  function getAllProducts() {
    fetch("http://localhost:4000/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Show all products :");
      console.log(data);
      setProduct(data);
    });
  }

  function getSomeProducts(category) {
    console.log(category);
    fetch("http://localhost:4000/" + category)
    .then((response) => response.json())
    .then((data) => {
      console.log("Show category :", category);
      console.log(data);
      setProduct(data);
    });
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
              <h1>Menu</h1>
              <div class="menu">
                <div>
                  <button onClick={() => getAllProducts()}>Show All</button> <br/>
                  <button onClick={() => getSomeProducts("Appetizer")}>Appetizers</button> <br/>
                  <button onClick={() => getSomeProducts("Chicken")}>Chicken</button> <br/>
                  <button onClick={() => getSomeProducts("Beef")}>Beef</button> <br/>
                  <button onClick={() => getSomeProducts("Seafood")}>Seafood</button> <br/>
                  <button onClick={() => getSomeProducts("Classic")}>Classic Dishes</button> <br/>
                </div>
                <div class='space'></div>
                <div>{showAllItems}</div>
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
          <button onClick={() => handleViewChange(2)}>Menu</button>
          <button onClick={() => handleViewChange(3)}>Contact Us</button>
        </div>
        {getView()}

      </div>
    </div>
  );
}

export default App;
