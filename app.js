const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const Photo = require('./models/Photo.js');

mongoose.connect('mongodb://localhost/pcat-test-db');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', { photos: photos });
});

app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id);
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });

  //res.render(`photos/${req.params.id}`);
  //res.render('about');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  console.log(req.files.image);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port} adresinde başlatıldı`);
});
