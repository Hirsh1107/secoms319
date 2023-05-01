import { useState, useEffect } from 'react';

function App() {
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [view, setView] = useState(1); // 1 = create, 2 = read, 3 = update, 4 = delete
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });
  const [updateProduct, setUpdateProduct] = useState({
    _id: 0,
    price: 0.0
  });
  const [id, setId] = useState(0);
  
  function handleViewChange(viewnum) {
    setView(viewnum)
  }

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
    else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } 
    else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } 
    else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    }  
    else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } 
    else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({ ...addNewProduct, rating: { rate: temp, count: value }});
    }
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
    <img src={el.image} width={30} /> <br />
    Title: {el.title} <br />
    Category: {el.category} <br />
    Price: {el.price} <br />
    Rate: {el.rating.rate} and Count: {el.rating.count} <br />
    </div>
  ));
    
  function getOneProduct(id) {
    console.log(id);
    setId(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Show one product :", id);
        console.log(data);
        const dataArr = [];
        dataArr.push(data);
        setOneProduct(dataArr);
      });
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
    <img src={el.image} width={30} /> <br />
    Title: {el.title} <br />
    Category: {el.category} <br />
    Price: {el.price} <br />
    Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

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
       
  //handle all views here
  function getView() {
    switch (view) {
      case 1: 
      return (
        <div>
          <h1>A view to add or Create a new product to the database in Mongo</h1>
        <h3>Add a new product :</h3>
        <form action="">
        <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
        <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handleChange} />
        <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
        <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
        <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handleChange} />
        <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
        <input type="number" placeholder="rate?" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} />
        <input type="number" placeholder="count?" name="count" value={addNewProduct.rating.count} onChange={handleChange} />
        <button type="submit" onClick={handleOnSubmit}>
        submit
        </button>
        </form>
        </div>
      );
        
      case 2: 
      return (
        <div>
        <h1>2: A view to show or Read all the products contained in your catalog in Mongo</h1>
        <hr></hr>
        <div>{showAllItems}</div>
        </div>
      );
        
      case 3:
      return (
        <div>
        <h1>3: A view to Update the price for any product already contained in the catalog in Mongo</h1>
        <hr></hr>
        <input type="number" id="update1" name="_id" placeholder="id" value={updateProduct._id} onChange={handleUpdate} />
        <label for="update1">Which Product to modify?</label>
        <button onClick={() => getOneProduct(updateProduct._id)}>Search</button>
        <br></br>
        <div>{showOneItem}</div>
        <br></br>
        <input type="number" id="change" name="price" placeholder="price" value={updateProduct.price} onChange={handleUpdate}/>
        <label for="change">What is the new price?</label>
        <button onClick={() => updateItem(updateProduct._id)}>Update</button>
        </div>
      );
        
      case 4: 
      return (
        <div>
        <h1>4: A view to Delete one product from the catalog in Mongo</h1>
        <hr></hr>
        <input type="text" id="message" name="message" placeholder="id" value={id} onChange={handleDelete} />
        <label for="message">Which Product to delete?</label>
        <button onClick={() => getOneProduct(id)}>Search</button>
        <br></br>
        <div>{showOneItem}</div>
        <br></br>
        <button onClick={() => deleteOneProduct(id)}>Delete</button>
        </div>
      );
    }
  }
        
  return (
    <div>
    <h1>Assignment03</h1>
    <button onClick={() => handleViewChange(1)}>Create</button>
    <button onClick={() => getAllProducts()}>Read</button>
    <button onClick={() => handleViewChange(3)}>Update</button>
    <button onClick={() => handleViewChange(4)}>Delete</button>
    {getView()}
    </div>
    );
  }
  
  export default App;
