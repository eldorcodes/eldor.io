const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

app.use(express.static('public'))

app.get('/',(req,res) => {
    res.render('home');
});
app.get('/about',(req,res) => {
    res.render('about');
});

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});