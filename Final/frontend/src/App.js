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
      <img src={el.image} width="50px" alt={el.title} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
    </div>
  ));

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
            <div>
              <Carousel slide_1={frontdesk} slide_2={outside} slide_3={seatingarea} slide_4={bar} />
              <div style={{width: "800px", position: "absolute", left: "900px"}}>
                <h2>Red Lantern serves the Davenport area with delicious chinese cuisine.
                Our specialty dishes have been well-crafted to create a delightful culinary experience.
                Enjoy the convenience of pickup or delivery when ordering through <a href="https://www.davenportredlantern.com/">Beyond Menu</a>.</h2>
              </div>
              
            </div>
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
