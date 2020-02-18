const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.nom = !isEmpty(data.nom) ? data.nom : '';
  data.prenom = !isEmpty(data.prenom) ? data.prenom : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.motDePasse = !isEmpty(data.motDePasse) ? data.motDePasse : '';
  data.numeroTelephone = !isEmpty(data.numeroTelephone) ? data.numeroTelephone : '';
  

  if (!Validator.isLength(data.nom, { min: 2, max: 30 })) {
    errors.nom = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.nom)) {
    errors.nom = 'Name field is required';
  }

  if (Validator.isEmpty(data.prenom)) {
    errors.prenom = 'prenom field is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.motDePasse)) {
    errors.motDePasse = 'Password field is required';
  }

  if (!Validator.isLength(data.motDePasse, { min: 6, max: 30 })) {
    errors.motDePasse = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.numeroTelephone)) {
    errors.numeroTelephone = 'numeroTelephone field is required';
  }

//   if (!Validator.equals(data.motDePasse, data.numeroTelephone)) {
//     errors.numeroTelephone = 'Passwords must match';
//   }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
