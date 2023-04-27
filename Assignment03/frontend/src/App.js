import { useState, useEffect } from 'react';

function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [view, setView] = useState(1); // 1 = create, 2 = read, 3 = update, 4 = delete

  function handleViewChange(viewnum) {
    setView(viewnum)
  }

  function getView() {
    switch (view) {
      case 1: 
        return (
          <h1>1: A view to add or Create a new product to the database in Mongo</h1>
        );
      
      case 2: 
        return (
          <h1>A view to show or Read all the products contained in your catalog in Mongo</h1>
        );

      case 3:
        return (
          <h1>A view to Update the price for any product already contained in the catalog in Mongo</h1>
        );

      case 4: 
        return (
          <h1>A view to Delete one product from the catalog in Mongo</h1>
        );
    }
  }

  return (
    <div>
      {getView()};
    </div>
  );
}

export default App;
