import { useState, useEffect } from 'react';
import logo from './images/logo.jpg';
import bar from './images/bar.jpg';
import frontdesk from './images/frontdesk.jpg';
import outside from './images/outside.jpg';
import seatingarea from './images/seatingarea.jpg';
import './App.css';

function App() {
  const [product, setProduct] = useState([]);
  const [view, setView] = useState(1); // 1 - main, 2 - menu, ...
  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    category: "",
    image: "http://127.0.0.1:4000/images/food-placeholder.jpg"
  });
  const [updateProduct, setUpdateProduct] = useState({
    _id: 0,
    price: 0.0
  });

  function handleViewChange(viewnum) {
    if (viewnum === 2) {
      getSomeProducts("Appetizer");
    }
    setView(viewnum);
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
    <div key={el._id}>
      <div class='menuitem row'>
        <div>
          <img src={el.image} width="100px" alt={el.title} class="menuimg"/>
        </div>
        <div>
          <h2>{el.title} <br /></h2>
          <i>Price: {el.price} <br /></i>
        </div>
      </div>
    </div>
  ));

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Post a new product completed");
      console.log(data);
      if (data) {
        const value = Object.values(data);
        alert(value);
      }
    });
  }

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } 
    else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } 
    else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } 
    else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } 
    else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    }
  }

  function handleDelete(evt) {
    setId(evt.target.value);
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    setId(id);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Delete a product completed : ", deleteid);
      console.log(data);
      if (data) {
      const value = Object.values(data);
      alert(value);
      }
    });
  }

  function updateItem(e) {
    console.log(e);
    fetch("http://localhost:4000/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateProduct),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Update a product completed");
      console.log(data);
      if (data) {
        const value = Object.values(data);
        alert(value);
      }
    });
  }

  function handleUpdate(evt) {
    const value = evt.target.value;

    if (evt.target.name === "_id") {
      setUpdateProduct({ ...updateProduct, _id: value });
    } 
    else if (evt.target.name === "price") {
      setUpdateProduct({ ...updateProduct, price: value });
    } 
  }

  function Carousel(props) {

    const images = [
      props.slide_1,
      props.slide_2,
      props.slide_3,
      props.slide_4,
    ];

    const [currentImage, setCurrentImage] = useState(0);
    const [prevImage, setPrevImage] = useState(images.length - 1);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setPrevImage(currentImage);
        setCurrentImage((currentImage + 1) % images.length);
      }, 3000);
      return () => clearInterval(intervalId);
    }, [currentImage]);

    return (
      <div className="carousel">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            className={`
            carousel-image
            ${index === currentImage ? 'current-image' : ''}
            ${index === prevImage ? 'prev-image' : ''}
          `}
          />
        ))}
      </div>
    );
  }

  // current website for ideas
  function getView() {
    switch (view) {
      case 1:
        return (
          <div>
            <h1>About Us</h1>
            <div class='backgroundthing'>
              <Carousel slide_1={frontdesk} slide_2={outside} slide_3={seatingarea} slide_4={bar} />
              <div style={{width: "800px", position: "absolute", left: "900px"}}>
                <p class='home'>Red Lantern serves the Davenport area with delicious chinese cuisine.
                Our specialty dishes have been well-crafted to create a delightful culinary experience.
                Enjoy the convenience of pickup or delivery when ordering through <a href="https://www.davenportredlantern.com/" target='_blank' rel='noreferrer'>Beyond Menu</a>.</p>
              </div>
            </div>
            <div class='foot'>
                <p>This webpage was created for SE/ComS319 Construction of User Interfaces, Spring 2023 @ Iowa State University taught by <a href="mailto:aaldaco@iastate.edu">Dr. Abraham N. Aldaco Gastelum</a>. Created on May 06, 2023.</p>
                <p>Created by <a href="mailto:jjiang27@iastate.edu">Jason Jiang</a> and <a href="mailto:ahirsh@iastate.edu">Andrew Hirsh</a>. View all of our projects <a href="https://github.com/JJiang76/secoms319" target="_blank">here</a></p>
              </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h1>Menu</h1>
              <div class="row">
                <div>
                  <button class='menuButton' onClick={() => getSomeProducts("Appetizer")}>Appetizers</button> <br/>
                  <button class='menuButton' onClick={() => getSomeProducts("Chicken")}>Chicken</button> <br/>
                  <button class='menuButton' onClick={() => getSomeProducts("Beef")}>Beef</button> <br/>
                  <button class='menuButton' onClick={() => getSomeProducts("Seafood")}>Seafood</button> <br/>
                  <button class='menuButton' onClick={() => getSomeProducts("Classic")}>Classic Dishes</button> <br/>
                </div>
                <div class='space'></div>
                <div class='menu'>
                  {showAllItems}
                </div>
              </div>
              <div class='foot'>
                <p>This webpage was created for SE/ComS319 Construction of User Interfaces, Spring 2023 @ Iowa State University taught by <a href="mailto:aaldaco@iastate.edu">Dr. Abraham N. Aldaco Gastelum</a>. Created on May 06, 2023.</p>
                <p>Created by <a href="mailto:jjiang27@iastate.edu">Jason Jiang</a> and <a href="mailto:ahirsh@iastate.edu">Andrew Hirsh</a>. View all of our projects <a href="https://github.com/JJiang76/secoms319" target="_blank">here</a></p>
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
                  <br/>
                  <h3>Hours of Operation</h3>
                  <h4>- Monday: Closed</h4>
                  <h4>- Tuesday-Sunday: 11:00am - 09:00pm</h4>
                </div>
              </div>
              <div class='foot'>
                <p>This webpage was created for SE/ComS319 Construction of User Interfaces, Spring 2023 @ Iowa State University taught by <a href="mailto:aaldaco@iastate.edu">Dr. Abraham N. Aldaco Gastelum</a>. Created on May 06, 2023.</p>
                <p>Created by <a href="mailto:jjiang27@iastate.edu">Jason Jiang</a> and <a href="mailto:ahirsh@iastate.edu">Andrew Hirsh</a>. View all of our projects <a href="https://github.com/JJiang76/secoms319" target="_blank">here</a></p>
              </div>
            </div>
          );

          case 4: 
            return (
              <div class='row end'>
                <div>
                  <h1>Add Menu Item</h1>
                  <form action="POST">
                    <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
                    <label for="_id"> Id</label>
                    <br></br>
                    <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
                    <label for="title"> Title</label>
                    <br></br>
                    <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
                    <label for="price"> Price</label>
                    <br></br>
                    <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
                    <label for="category"> Category</label>
                    <br></br>
                    <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
                    <label for="image"> Image source</label>
                    <br></br>
                    <button class='formbtn' type="submit" onClick={handleOnSubmit}>Submit</button>
                  </form>
                </div>
                <div>
                  <h1>Change Menu Item Price</h1>
                  <input type="number" id="update1" name="_id" placeholder="id" value={updateProduct._id} onChange={handleUpdate} />
                  <label for="update1">Which Product to modify?</label>
                  <br />
                  <input type="number" id="change" name="price" placeholder="price" value={updateProduct.price} onChange={handleUpdate}/>
                  <label for="change">What is the new price?</label>
                  <br />
                  <button class='formbtn' onClick={() => updateItem(updateProduct._id)}>Update</button>
                </div>
                <div>
                  <h1>Delete Menu Item</h1>
                  <input type="text" id="message" name="message" placeholder="id" value={id} onChange={handleDelete} />
                  <label for="message">Which Product to delete?</label>
                  <br></br>
                  <button class='formbtn' onClick={() => deleteOneProduct(id)}>Delete</button>
                </div>
              </div>
            );
    }
  }

  return (
    <div>
      <div class="main-view">
        <div style={{ height: '60px' }}></div>
        <div class="navigator">
          <img src={logo} alt="logo" width="20%" class="logo"></img>
          <button onClick={() => handleViewChange(1)}>Home</button>
          <button onClick={() => handleViewChange(2)}>Menu</button>
          <button onClick={() => handleViewChange(3)}>Contact Us</button>
          <button onClick={() => handleViewChange(4)}>Edit</button>
        </div>
        {getView()}
      </div>
    </div>
  );
}

export default App;
