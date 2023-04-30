import { useState, useEffect } from 'react';

function App() {
  const [product, setProduct] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [view, setView] = useState(1); // 1 = create, 2 = read, 3 = update, 4 = delete
  

  
  function handleViewChange(viewnum) {
    setView(viewnum)
  }
  
  function Form() {
    const [addNewProduct, setAddNewProduct] = useState({
      _id: 0,
      title: "",
      price: 0.0,
      description: "",
      category: "",
      image: "http://127.0.0.1:4000/images/",
      rating: { rate: 0.0, count: 0 },
    });
    
    
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
    } else if (evt.target.name === "title") {
    setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
    setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
    setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
    setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
    const temp = value;
    setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
    setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
    const temp = addNewProduct.rating.rate;
    setAddNewProduct({
    ...addNewProduct,
     rating: { rate: temp, count: value },
    });
    }
    }
    
    function FormElement(props) {
      return (
        <div>
        {props.text}:
        <input 
        type="text" 
        id = {props.text}
        value = {props.val}
        onChange={handleChange}
        />
        </div>
        )
      }
      
      return (
        <div>
        <h1>Post new item</h1>
        <form onSubmit={handleOnSubmit}>
        <FormElement text={"_id"} val={addNewProduct._id}/>
        <FormElement text={"title"} val={addNewProduct.title}/>
        <FormElement text={"price"}  val={addNewProduct.price}/>
        <FormElement text={"description"} val={addNewProduct.description}/>
        <FormElement text={"category"} val={addNewProduct.category}/>
        <FormElement text={"image"} val={addNewProduct.image}/>
        <FormElement text={"rate"} val={addNewProduct.rate}/>
        <FormElement text={"count"} val={addNewProduct.count}/>
        <input type="submit" />
        </form>
        </div>
        
        )
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

  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
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
    setChecked4(!checked4);
  }
       
  //handle all views here
  function getView() {
    switch (view) {
      case 1: 
      return (
        <Form/>
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
        <input type="text" id="message" name="message" placeholder="id" onChange={(e) =>getOneProduct(e.target.value)} />
        <label for="message">Which Product to modify?</label>
        <br></br>
        <div>{showOneItem}</div>
        <br></br>
        <input type="text" id="change" name="change" placeholder="id" />
        <label for="change">What is the new price?</label>
        </div>
      );
        
      case 4: 
      return (
        <h1>4: A view to Delete one product from the catalog in Mongo</h1>
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
