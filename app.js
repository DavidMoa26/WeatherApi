const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const location = req.body.cityName;
    const apiKey = "8e8599910fffa7c4c7a24a3e79786322";
    const units = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`;

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`



            res.write(`<p>The weather is currently ${weatherDescription} </p>`);
            res.write(`<h1>The temperature in ${location} is ${temp} degrees celsius </h1>`);
            res.write(`<img src="${imageURL}">`);
            res.send();

        });
    });
});



app.listen(3000, function () {
    console.log("Server is running on port 3000");
});