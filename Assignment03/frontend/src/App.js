import { useState, useEffect } from 'react';

function App() {
  const [product, setProduct] = useState([]);
  const [view, setView] = useState(1); // 1 = create, 2 = read, 3 = update, 4 = delete

  function handleViewChange(viewnum) {
    setView(viewnum)
  }

  //handle all views here
  function getView() {
    switch (view) {
      case 1: 
        return (
          <h1>1: A view to add or Create a new product to the database in Mongo</h1>
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
