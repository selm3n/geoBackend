const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.mot_de_passe = !isEmpty(data.mot_de_passe) ? data.mot_de_passe : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.mot_de_passe)) {
    errors.mot_de_passe = 'mot_de_passe field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
