const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const Photo = require('./models/Photo.js');
const PhotoController = require('./controllers/photoControllers');
const PageController = require('./controllers/pageController');

mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(express.static('public'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', PhotoController.getAllPhotos);
app.get('/photos/:id1', PhotoController.getPhoto);
app.post('/photos', PhotoController.createPhoto);
app.put('/photos/:id3', PhotoController.editPhoto);
app.delete('/photos/:id4', PhotoController.deletePhoto);

app.get('/about', PageController.getAboutPage);
app.get('/add', PageController.getAddPage);
app.get('/photos/edit/:id2', PageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port} adresinde başlatıldı`);
});
