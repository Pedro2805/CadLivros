const express = require ('express');
const app = express();
const bodyParser = require ('body-parser');

const mongoose = require('mongoose');

const Cliente = require('./models/cliente')

app.use (bodyParser.json());


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:<usjt>@cluster0.vjxze.mongodb.net/<user>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

    useUnifiedTopology: true

  .then(() => {
    console.log("Conexão OK!");
  })
  .catch((error) => {
    console.log("Conexão não funcionou!");
    console.log(error);
  })


app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

  next();
});

app.get('/api/clientes', (req, res, next) => {
  Cliente.find().then(
    documents => {
      res.status(200).json(
        {
          mensagem: "Tudo OK",
          clientes: documents
        }
      );
    }
  );
});

app.post('/api/clientes', (req, res, next) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });

  cliente.save()
    .then (clienteInserido => {
      res.status(201).json({
        mensagem: 'Cliente inserido',
        id: clienteInserido._id
      })
    })
  });

app.delete('/api/clientes/:id', (req, res, next) => {

  Cliente.deleteOne ({_id: req.params.id}).then((resultado) => {
    console.log (resultado);
    res.status(200).json({mensagem: "Cliente removido"})
  });
});

app.put("/api/clientes/:id", (req, res, next) => {

  const cliente = new Cliente({
    _id: req.params.id,
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  });

  Cliente.updateOne({
      _id: req.params.id
    },
    cliente
  ).then( (resultado) => {
    console.log(resultado);
  });
  res.status(200).json({
    mensagem: 'Atualização realizada com sucesso!'
  });

});

module.exports = app;
