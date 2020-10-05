const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

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

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});