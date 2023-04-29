import { useState, useEffect } from 'react';

function App() {
  const [product, setProduct] = useState([]);
  const [view, setView] = useState(1); // 1 = create, 2 = read, 3 = update, 4 = delete

  function handleViewChange(viewnum) {
    setView(viewnum)
  }

  function Form() {
    const [formData, setFormData] = useState({
      _id: '',
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
      rate: 0,
      count: 0
    });

    const handleSubmit = (e) => {
      e.preventDefault()
      alert(formData._id)
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    function FormElement(props) {
      return (
        <div>
          {props.text}:
          <input 
            type="text" 
            id = {props.text}
            value = {props.val}
            onChange={handleInputChange}
          />
        </div>
      )
    }

    return (
      <div>
        <h1>Post new item</h1>
        <form onSubmit={handleSubmit}>
          <FormElement text={"_id"} val={formData._id}/>
          <FormElement text={"title"} val={formData.title}/>
          <FormElement text={"price"}  val={formData.price}/>
          <FormElement text={"description"} val={formData.description}/>
          <FormElement text={"category"} val={formData.category}/>
          <FormElement text={"image"} val={formData.image}/>
          <FormElement text={"rate"} val={formData.rate}/>
          <FormElement text={"count"} val={formData.count}/>
        <input type="submit" />
        </form>
      </div>
        
    )
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
          <h1>2: A view to show or Read all the products contained in your catalog in Mongo</h1>
        );

      case 3:
        return (
          <h1>3: A view to Update the price for any product already contained in the catalog in Mongo</h1>
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
      <button onClick={() => handleViewChange(2)}>Read</button>
      <button onClick={() => handleViewChange(3)}>Update</button>
      <button onClick={() => handleViewChange(4)}>Delete</button>
      {getView()};
    </div>
  );
}

export default App;
