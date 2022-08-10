const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Retorna um array com todos os documentos do banco de dados
router.get('/', (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => res.status(500).json(error));
});

// Adiciona um novo usuário no banco de dados
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

// Atualizando dados de um usuário já existente
router.put('/edit/:id', (req, res) => {
    const newData = { name: req.body.name, email: req.body.email };

    User.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
        .then(user => {
            res.json(user);
        })
        .catch(error => res.status(500).json(error));
});

// Deletando um usuário do banco de dados
router.delete('/delete/:id', (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
        .then(user => {
            res.json(user);
        })
        .catch(error => res.status(500).json(error));
});

module.exports = router;