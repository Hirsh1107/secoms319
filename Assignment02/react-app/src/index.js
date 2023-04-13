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
  const [countList, setCountList] = useState(Array(Products.length).fill(1));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    card: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    errors: {}
  });
  const [view, setView] = useState(1); // 1 = shop, 2 = cart, 3 = confirmation
  const [custName, setCustName] = useState('');
  const [custAddr, setCustAddr] = useState('');
  const [custCard, setCustCard] = useState('');
  const [custEmail, setCustEmail] = useState('');


  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
    
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
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

  function handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    let errorExists = false;

    if (!formData.name) {
      errors.name = 'Name is required';
      errorExists = true;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      errorExists = true;
    }
    else if (!formData.email.match(
       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9] {1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
       )) {
        errors.email = 'Email is invalid';
        errorExists = true;
    }

    if (!formData.card) {
      errors.card = 'Card is required';
      errorExists = true;
    }
    else if (!formData.card.match(/^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)) {
      errors.card = 'Card number invalid';
      errorExists = true;
    }

    if (!formData.address) {
      errors.address = 'Address is required';
      errorExists = true;
    }

    if (!formData.city) {
      errors.city = 'City is required';
      errorExists = true;
    }

    if (!formData.state) {
      errors.state = 'State is required';
      errorExists = true;
    }

    if (!formData.zip) {
      errors.zip = 'Zip code is required';
      errorExists = true;
    }
    else if (!formData.zip.match(/^\d{5}/)) {
      errors.zip = 'Zip code is invalid';
      errorExists = true;
    }

    formData.errors = errors;
    console.log(formData);

    if (!errorExists) {
      setCustName(formData.name);
      setCustAddr(formData.address);
      setCustEmail(formData.email);
      setCustCard(formData.card.slice(-4));
      handleViewChange(3);
    }
  }

  function handleViewChange(viewnum) {
    setView(viewnum)
  }

  function getView() {
    switch (view) {
      case 1:
        return (
          <div class="background">
            <div class="container">
              <h1>Store Assignment 2</h1>
              <h2>Products: {Products.length}</h2>
              <button onClick={() => handleViewChange(2)}>View Cart ({cartItems.length})</button>

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
        );

      case 2: 
      const subtotal = cartItems.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
      const tax = subtotal * 0.07;
      const total = subtotal + tax;
        return (
          <div class="background">
          <h1>Cart</h1>
          <button onClick={() =>handleViewChange(1)}>Return</button>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
            <div class="container">
      
              <div class="row">
              <div class="col-2"></div>
              
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
                <div class="col-2"></div>
                <div class="col-8">
      
                  <h1>Payment Information</h1>
      
                  <div id="liveAlertPlaceholder"></div>
      
                  <form class="row g-3" id="checkout-form" onSubmit={handleSubmit}>
      
                    <div class="col-md-6">
                      <label for="inputName" class="form-label">Full Name</label>
                      <input type="text" class="form-control" id="inputName" onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                      {formData.errors.name && <div>{formData.errors.name}</div>}
                    </div>
      
                    <div class="col-md-6">
                      <label for="inputEmail4" class="form-label">Email</label>
                      <input type="email" class="form-control" id="inputEmail4" onChange={(e) => setFormData({...formData, email: e.target.value})}/>
                      {formData.errors.email && <div>{formData.errors.email}</div>}
                    </div>
      
                    <div class="col-12">
                      <label for="inputCard" class="form-label">Card</label>
                      <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1"><i class="bi-credit-card-fill"></i></span>
                        <input type="text" id="inputCard" class="form-control" placeholder="XXXX-XXXX-XXXX-XXXX"
                          aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setFormData({...formData, card: e.target.value})}/>
                      </div>
                      {formData.errors.card && <div>{formData.errors.card}</div>}
                    </div>
      
                    <div class="col-12">
                      <label for="inputAddress" class="form-label">Address</label>
                      <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" onChange={(e) => setFormData({...formData, address: e.target.value})}/>
                      {formData.errors.address && <div>{formData.errors.address}</div>}
                    </div>
                    <div class="col-md-6">
                      <label for="inputCity" class="form-label">City</label>
                      <input type="text" class="form-control" id="inputCity" onChange={(e) => setFormData({...formData, city: e.target.value})}/>
                      {formData.errors.city && <div>{formData.errors.city}</div>}
                    </div>
                    <div class="col-md-4">
                      <label for="inputState" class="form-label">State</label>
                      <input type="text" class="form-control" id="inputState" onChange={(e) => setFormData({...formData, state: e.target.value})}/>
                      {formData.errors.email && <div>{formData.errors.email}</div>}
                    </div>
                    <div class="col-md-2">
                      <label for="inputZip" class="form-label">Zip</label>
                      <input type="text" class="form-control" id="inputZip" onChange={(e) => setFormData({...formData, zip: e.target.value})}/>
                      {formData.errors.zip && <div>{formData.errors.zip}</div>}
                    </div>
                    <div class="col-12">
                      <button type="submit" class="btn btn-success"> <i class="bi-bag-check"></i> Order</button>
                    </div>
                  </form>
                </div>
                <div class="col-2"></div>
              </div>
            </div>
            </>  
          )}
        </div>
        );
      
        case 3: 
        const subttl = cartItems.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0);
        const tx = subttl * 0.07;
        const ttl = subttl + tx;
          return (
            <div class="background" style={{width: "18rem"}}>
              <div class="card-body">
                <h3 class="card-title">Order summary</h3>
                <p class="card-text">Thank you {custName} for your order! We have sent a confirmation email to {custEmail}.</p>
                <p class="card-text">Your order will be shipped to {custAddr}.</p>
              </div>
              <ul class="list-group list-group-flush">
                {cartItems.map((item, index) => (
                    <li key={index}>
                      {item.product.title} - {item.quantity} x ${item.product.price}
                    </li>
                  ))}
                </ul>
                <p>
                  Subtotal: ${subttl.toFixed(2)}
                </p>
                <p>
                  Tax: ${tx.toFixed(2)}
                </p>
                <p>
                  Total: ${ttl.toFixed(2)}
                </p>

                <p>Your card ending with {custCard} was charged. Thank you for your purchase!</p>
              <a href="" onClick={() => handleViewChange(1)} class="btn btn-secondary"> <i class="bi-arrow-left-circle"></i>
                Return</a>
            </div>
        );
    }
  }

  return (
    <div>
      {getView()};
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
