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
//mongodb://localhost/pcat-test-db
mongoose
  .connect(
    'mongodb+srv://yusuf:allah1@etsyfetch.vaunvnx.mongodb.net/pcat-Test-db-gcloud?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected To Database');
  })
  .catch((err) => {
    console.log(err);
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`http://localhost:${port} adresinde başlatıldı`);
});
