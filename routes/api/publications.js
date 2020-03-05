
const publicationcontroller = require("../../controllers/publication");
const jwt = require('jsonwebtoken');
const passport = require('passport');
// const multer = require('../../config/multer');

var multer = require("multer");
const path = require("path");

const { check, validationResult } = require("express-validator");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
  language: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.language.replace(/\s/g, ""));
  }
});


const upload = multer({
  storage: storage,
  //mimetype: "image/jpeg"
});


module.exports.setup = function(app) {

  app.post('/api/publications/add',
    upload.array(
      "images",
      100
    ),
    publicationcontroller.addPublication);
    

  app.get('/api/publications/all',
    publicationcontroller.allPublications);




}
