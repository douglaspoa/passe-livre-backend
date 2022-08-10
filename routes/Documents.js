const express = require('express');
const multer = require('multer');
const router = express.Router();

const Documents = require('../models/Documents');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const fileExtension = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const newFileName = require('crypto')
            .randomBytes(64)
            .toString('hex');

        // Indica o novo nome do arquivo:
        cb(null, `${newFileName}.${fileExtension}`)
    }
});

const upload = multer({ storage });

// Retorna um array com todos os documentos do banco de dados
router.get('/', (req, res) => {
    Documents.find()
        .then(documents => {
            res.json(documents);
        })
        .catch(error => res.status(500).json(error));
});

// Adiciona um novo documento no banco de dados
router.post('/new', upload.single('imgPath'), (req, res) => {
    const newDocuments = new Documents({
        userId: req.body.userId,
        type: req.body.type,
        imgPath: req.file.filename
    });

    newDocuments
        .save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

// Atualizando dados de um documento já existente
router.put('/edit/:id', (req, res) => {
    const newData = { userId: req.body.userId, type: req.body.type, imgPath: req.body.imgPath, approved: req.body.approved };

    Documents.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
        .then(user => {
            res.json(user);
        })
        .catch(error => res.status(500).json(error));
});

// Deletando um documento do banco de dados
router.delete('/delete/:id', (req, res) => {
    Documents.findOneAndDelete({ _id: req.params.id })
        .then(user => {
            res.json(user);
        })
        .catch(error => res.status(500).json(error));
});

module.exports = router;