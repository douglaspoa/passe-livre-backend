const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post('/new', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });

    newUser
        .save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;