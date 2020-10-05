const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

const keys = require('./config/keys');

const app = express();
// load models
const User = require('./models/user');
const Message = require('./models/message');
const Contact = require('./models/contact');
// setup view engine
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// setup PORT
const port = process.env.PORT || 3000;
// connect to client side (front-end)
app.use(express.static('public'))
// connect to mongodb
mongoose.connect(keys.MONGODB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
},() => {
    console.log('CONNECTED TO MONGODB..');
});
app.get('/',(req,res) => {
    res.render('home');
});
app.get('/about',(req,res) => {
    res.render('about');
});
app.get('/liveChat',(req,res) => {
    res.render('liveChat/chatRoom',{
        title: 'Live Chat'
    });
});
app.get('/contactme',(req,res) => {
    res.render('contact/contactme',{
        title:'Contacting'
    })
})
app.post('/contactme',(req,res) => {
    const newContact = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        date: new Date()
    }
    new Contact(newContact).save((err,contact) => {
        if (err) {
            throw err;
        }
        if (contact) {
            res.render('contact/success',{
                title: 'Success'
            })
        }
    })
})
app.get('/contacts',(req,res) => {
    Contact.find({})
    .sort({date:'desc'})
    .then((contacts)=>{
        res.render('contact/contacts',{
            title:"Inbox",
            contacts:contacts
        })
    }).catch((err) => {console.log(err)})
})
app.get('/skills',(req,res) => {
    res.render('skills');
});
app.get('/services',(req,res) => {
    res.render('services');
});
app.get('/portfolio',(req,res) => {
    res.render('portfolio');
});
app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});