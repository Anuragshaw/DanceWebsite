const express = require("express");
const { request } = require("http");
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const port = 8000;

// Defining Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

var Contact = mongoose.model('Contact', contactSchema);
  
// Express
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//Pug
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));

//End Points
app.get('/', (req, res)=>{
    const params = { };
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = { };
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res)=>{
    const params = { };
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        alert("This is a Message");
    }).catch(()=>{
        res.status(400).render("Item was not saved to the database");
    })
    res.status(200).render('contact.pug', params);
});

//Start the Server
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});