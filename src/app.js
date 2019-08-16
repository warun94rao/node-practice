const express = require('express');
const path = require('path');
const hbs  = require('hbs')
const request = require("request")
const geocode = require('./utility/utility')
const forecast = require('./utility/forecast')

const app = express()
const port = process.env.PORT || 3000

// check how path.join works
console.log(path.join(__dirname,'../../../'));
// console.log(__filename);

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPATH = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views',viewPATH)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));



// app.get('',(req,res)=>{
//     res.send("<h1>WEATHER</h1>")
// })

// app.get('/help',(req,res)=>{
//     res.send([{name:"varun"},{name:"WARUN"}])
// })



// app.get('/about',(req,res)=>{
//     res.send('<h1>ABOUT YOU</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: "WEATHER APP",
        name: "VARUN"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "VARUN"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "help page",
        name: "VARUN"
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "help not found",
        name: "VARUN"
    })
})

app.get('/products', (req, res) => {
    console.log(req.query);
    if (!req.query.search) {
        return res.send({
            error:"You mst send search term"
        })
    }
    res.send({
        products:{}
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:"Address must be provided for the process"
        })
    }
    let address = req.query.address;
    geocode(address,(error,data={})=>{
        if (error) {
          return res.send({
              status:401,
              error:error
          });
        }
        
        forecast(data, (error, forecastData) => {
         if (error) {
            return res.send({
                status:401,
                error:error
            });
         }
        res.send({
            location:data.location,
            forecast_Data:forecastData
        })
        });
        });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 PAGE",
        name: "VARUN"
    })
})



app.listen(port, () => {
    console.log(`Express up and running in ${port}`)
})