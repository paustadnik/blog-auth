const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')

mongoose.connect('mongodb://localhost/blog-v2')

const app = express()

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000)
