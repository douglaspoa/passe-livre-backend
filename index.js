const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

// Adicionando arquivo de rota no endpoint /user
const user = require('./routes/user');

app.use('/api/user', user);

// Adicionando arquivo de rota no endpoint /documents
const documents = require('./routes/documents');

app.use('/api/documents', documents);


mongoose
    .connect('mongodb://db:27017/crud-node-mongo-docker', {
        useNewUrlParser: true
    })
    .then(result => {
        console.log('MongoDB Conectado');
    })
    .catch(error => {
        console.log(error);
    });

app.listen(9000, () => console.log('Server ativo na porta 9000'));