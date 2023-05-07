import { useState, useEffect } from 'react';
import logo from './images/logo.jpg';
import outside from './images/outside.jpg';
import front from './images/frontdesk.jpg';
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
    if (viewnum === 2) {
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
        <img src={el.image} width="100px" alt={el.title}/> <br />
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
            <h1>Welcome to Red Lantern in Davenport, Iowa! Serving the Quad Cities for 7 years.</h1> 

            <div class='row'>
              <h2>Red Lantern serves delicious Chinese cuisine at a premier location. Our dishes have been crafted by chefs with over 50 years of combined experience. Come enjoy our wide selection inside our fine dining atmosphere. Or if you are on the go, feel free to order online or through phone, and pick up quickly and conveniently. </h2>
              <img src={outside} alt='outside' width='200px'></img>
            </div>
            
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
              <h1>Questions? Contact Us! </h1>

              <div class='row end'>
                <div class='column'>
                  <h2>Location: 4009 E 53rd St. Davenport, IA 52807</h2>
                  <h2>Phone: (563) 355-7970</h2>
                </div>
                  <img src={front} alt='front' width='300px'></img>
                <div>
                </div>
                <div class='column'>
                  <h2>Hours of Operation</h2>
                  <h4>Monday: Closed</h4>
                  <h4>Tuesday-Sunday: 11:00am - 09:00pm</h4>
                </div>
              </div>
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
          <button onClick={() => handleViewChange(2)}>Menu</button>
          <button onClick={() => handleViewChange(3)}>Contact Us</button>
        </div>
        {getView()}

      </div>
    </div>
  );
}

export default App;
