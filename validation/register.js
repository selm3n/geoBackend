const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.nom = !isEmpty(data.nom) ? data.nom : '';
  data.type = !isEmpty(data.type) ? data.type : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.mot_de_pass = !isEmpty(data.mot_de_pass) ? data.mot_de_pass : '';
  data.tel_fixe = !isEmpty(data.tel_fixe) ? data.tel_fixe : '';
  //data.rs = !isEmpty(data.rs) ? data.rs : '';
  data.news_letter = !isEmpty(data.news_letter) ? data.news_letter : '';
  //data.cp = !isEmpty(data.cp) ? data.cp : '';
  data.pays = !isEmpty(data.pays) ? data.pays : '';
  //data.ville = !isEmpty(data.ville) ? data.ville : '';
  

  if (!Validator.isLength(data.nom, { min: 2, max: 30 })) {
    errors.nom = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.nom)) {
    errors.nom = 'Name field is required';
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = 'type field is required';
  }

  // if (Validator.isEmpty(data.rs)) {
  //   errors.rs = 'rs field is required';
  // }

  if (Validator.isEmpty(data.news_letter)) {
    errors.news_letter = 'news_letter field is required';
  }

  if (Validator.isEmpty(data.tel_fixe)) {
    errors.tel_fixe = 'tel_fixe field is required';
  }
  if (!Validator.isLength(data.tel_fixe, { min: 8 })) {
    errors.tel_fixe = 'tel_fixe must be at least 8 characters';
  }

  // if (Validator.isEmpty(data.cp)) {
  //   errors.cp = 'cp field is required';
  // }

  if (Validator.isEmpty(data.pays)) {
    errors.pays = 'pays field is required';
  }

  // if (Validator.isEmpty(data.ville)) {
  //   errors.ville = 'ville field is required';
  // }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.mot_de_pass)) {
    errors.mot_de_pass = 'Password field is required';
  }

  if (!Validator.isLength(data.mot_de_pass, { min: 6, max: 30 })) {
    errors.mot_de_pass = 'Password must be at least 6 characters';
  }

  



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
