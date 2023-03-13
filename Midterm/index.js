fetch('data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

    function appendData(data){
        let mainContainer = document.getElementById("container");
        for (let picture in data) {
            let div1 = document.createElement("div");
            let div2 = document.createElement("div");
            div1.classList.add("div-img");
            div2.classList.add("div-text");
            div1.innerHTML = `<img src="./images/${data[picture].filename}" alt="${data[picture].caption}">`;
            div2.innerHTML = `${data[picture].description}`
            mainContainer.appendChild(div2);
            mainContainer.appendChild(div1);
        }

        let div = document.createElement("div");
        div.classList.add("div-text");
        div.innerHTML = `Thank you for choosing Float as your marine service provider. We look forward to serving you!`
        mainContainer.appendChild(div);
        
    }