import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [view, setView] = useState(1); // 1 - main, 2 - menu, ...

  function handleViewChange(viewnum) {
    setView(viewnum);
  }

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
            </div>
          )
    }
  }

  return (
    <div>
      <button onClick={() => handleViewChange(1)}>Main</button>
      <button onClick={() => handleViewChange(2)}>Menu</button>
      {getView()}
    </div>
  );
}

export default App;
