import { useState, useEffect } from 'react';
import logo from './images/logo.jpg'
import bar from './images/bar.jpg'
import './App.css'

function App() {
  const [product, setProduct] = useState([]);
  const [view, setView] = useState(1); // 1 - main, 2 - menu, ...


  
    
  function getLocalMenuData() {
    function appendData(data){
      let mainContainer = document.getElementById("myData");
      for (let productName in data) {
      let div = document.createElement("div");
      div.innerHTML = `<br> <br> <h2> ${productName} </h2>`;
      mainContainer.appendChild(div);
      }
    }
    fetch('../menuItems.json')
      .then(function (response) {
      return response.json();
      })
      .then(function (data) {
      appendData(data);
      })
      .catch(function (err) {
      console.log('error:' + err);
      })
      

  }

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
        <div style={{ height: '60px' }}></div>
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
