const express = require('express')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const {isLoggedIn} = require('../middlewares/guard')

const router = express.Router()

router.get('/signin', (req, res) => {
    res.render('user/signin')
})

router.post('/signin', async (req, res) => {
    const user = new User()
    const hash = await bcrypt.hash(req.body.password, 10)
    user.email = req.body.email
    user.password = hash

    try {
        await user.save()
        res.redirect('/user/login')

    } catch (error) {
        console.log(error)
        res.redirect('/user/signin')
    }
})

router.get('/login', (req,res) => {
    res.render('user/login')
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/user/login')
})

router.post('/login', async (req, res) => { 
    try {
        const user = await User.findOne({ email: req.body.email })
        const isPwCorrect = await bcrypt.compare(req.body.password, user.password)
        if (isPwCorrect) {
            req.session.currentUser = user
            res.redirect('/user/profile')
        } else {
            res.redirect('/user/login')
        }

    } catch (error) {
        console.log(error)
        res.redirect('/user/login')
    }

    /* const user = await User.findOne({ email: req.body.email })

    if (user) {
        const isPwCorrect = await bcrypt.compare(req.body.password, user.password)

        if (isPwCorrect) {
            req.session.currentUser = user
            res.redirect('/profile')
        } else {
            res.redirect('/user/login')
        }

    } else {
        res.redirect('/user/login')
    } */
})







module.exports = router