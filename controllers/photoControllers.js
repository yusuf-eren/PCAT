const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', { photos: photos });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id1);
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
};

exports.editPhoto = async (req, res) => {
  const photoNewVersion = await Photo.findById(req.params.id3);
  photoNewVersion.title = req.body.title;
  photoNewVersion.description = req.body.description;
  await photoNewVersion.save();
  console.log(photoNewVersion);
  res.redirect(`/photos/${photoNewVersion._id}`);
};

exports.deletePhoto = async (req, res) => {
  console.log(req.params.id4);
  const deletePhoto = await Photo.findById(req.params.id4);
  let uploadPath = __dirname + '/../public' + deletePhoto.image;
  await fs.unlinkSync(uploadPath);
  await deletePhoto.delete();
  res.redirect('/');
};
