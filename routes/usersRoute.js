const express = require('express');
const User = require('../models/User')
const router = express.Router();

router.get('/test',async function (req, res) {
    try {
        res.send('Test successful')
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async function (req, res) {
    try {
        const result = await User.findOne({ email: req.body.email, password: req.body.password })
        if (result) {
            res.send(result);
        }
        else {
            res.status(404).json('User not found');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
router.post('/register', async function (req, res) {
    try {
        const newuser=new User(req.body);
        await newuser.save();
        res.send('User created');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;