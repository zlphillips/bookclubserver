require('dotenv').config();
var express = require('express')
var app = express()
var user = require('./controllers/usercontroller')
var book = require('./controllers/bookcontroller')
var sequelize = require('./db')

sequelize.sync();

app.use(express.json());


app.use(require('./middleware/headers'));

app.use('/bookclub/user', user)
app.use('/bookclub/book', book)

app.listen(process.env.PORT, function(){
    console.log(`${process.env.PORT}`)
})