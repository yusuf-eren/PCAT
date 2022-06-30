const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add');
};

exports.getEditPage = async (req, res) => {
  const photoUpdate = await Photo.findOne({ _id: req.params.id2 });
  res.render('edit', { photoUpdate });
};
