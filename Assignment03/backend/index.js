const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/reactdata",
    {
    dbName: "reactdata",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
);

const port = process.env.PORT || 4000;
const host = "localhost";
app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});

app.get("/", async (req, resp) => {
    const query = {};
    const allProducts = await Product.find(query);
    console.log(allProducts);
    resp.send(allProducts);
});

function postMethod(postData) {
    fetch('http://localhost:8081/addUser', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ postData })
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
    var container = document.getElementById("showData");
    container.innerHTML = JSON.stringify(data);
    });
}    
    