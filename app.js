const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function(req,res){
    
    res.sendFile(__dirname + "/index.html")
    
    })
    


app.post('/',function(req,res){

    const query = req.body.cityName
    const unit = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + process.env.API_KEY +"="+ unit + "&q=" + query 
    
    

    https.get(url, function(response){
        console.log("status code : " + response.statusCode)
        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            
            const temp = weatherData.main.temp
            
            const weatherDescription = weatherData.weather[0].description
            
            
            const icon = weatherData.weather[0].icon
            
            const iconURL = "https://openweathermap.org/img/wn/"+ icon + "@2x.png"
            

            res.write("<h1>The temperature in "+ query + " is " + temp + " degrees Celsius.</h1>")
            res.write("<p>The weather is currently " + weatherDescription +".</p>")
            
            res.write("<img src =" + iconURL + ">")
            
            res.send()

        })

    }) 
})

const port = process.env.PORT
if (port == null || ""){
    port = 3000
} 
app.listen(port, function(){
    console.log(`Server started on ${port}`)
})
