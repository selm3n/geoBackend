const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};
//console.log('email ',data.email);
  data.email = !isEmpty(data.email) ? data.email : '';
  data.mot_de_pass = !isEmpty(data.mot_de_pass) ? data.mot_de_pass : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.mot_de_pass)) {
    errors.mot_de_pass = 'mot_de_pass field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
