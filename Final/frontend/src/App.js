import { useState, useEffect } from 'react';
import './App.css';
import logo from './images/logo.jpg'

function App() {
  const [product, setProduct] = useState([]);
  const [view, setView] = useState(1); // 1 - main, 2 - menu, ...

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
    <div key={el._id}>
    <img src={el.image} width="50px" alt={el.title}/> <br />
    Title: {el.title} <br />
    Category: {el.category} <br />
    Price: {el.price} <br />
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
              {showAllItems}
            </div>
          )
    }
  }

  return (
    <div>
      <img src={logo} alt="logo" width="50%"></img> <br></br>
      <button onClick={() => handleViewChange(1)}>Main</button>
      <button onClick={() => getAllProducts()}>Menu</button>
      {getView()}
    </div>
  );
}

export default App;
