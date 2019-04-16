const express = require('express');
const hbs = require('express-handlebars');
const mysql = require('mysql');
const cors = require('cors');
const uuidv4  = require('uuid/v4');
const member = require('./routes/member')
const place = require('./routes/place')
const PORT =  process.env.PORT || 5000;

const app = express();

app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/views/pages/',
}));



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
/*
  res.render('default', {layout: 'default', template: 'home-template'});*/
});

app.set('views', __dirname + '/views/pages/');
app.use('/member', member)
app.use('/place', place)

app.listen(PORT,()=>{

});