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
          )
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
        </div>
        {getView()}
      </div>
    </div>
  );
}

export default App;
