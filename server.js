const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const store = require('connect-mongo')
const {isLoggedIn} = require('./middlewares/guard')

mongoose.connect('mongodb://localhost/blog-v2')

const app = express()
const userRouter = require('./routes/user.routes')


app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(session({
  secret: 'helloworld',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 120000,
  },
  store: store.create({
    mongoUrl: 'mongodb://localhost/blog-v2'
  })
})
)
app.use((req, res, next) => {
  res.locals.currentUser = req.session.currentUser
  next()
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/user/profile', isLoggedIn, (req, res) => {
  res.render('user/profile', {currentUser: req.session.currentUser})
})

// user routes
app.use('/user', userRouter)

app.listen(3000)
