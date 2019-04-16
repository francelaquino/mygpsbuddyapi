const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const cors = require('cors');
const uuidv4  = require('uuid/v4');

const member = require('./routes/member')
const place = require('./routes/place')
const PORT =  process.env.PORT || 5000;

const app = express();



app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/', (req, res) => {
  console.log("3")
  res.send('index');
});
app.use('/member', member)
app.use('/place', place)

app.listen(PORT,()=>{

});