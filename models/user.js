const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  nom: String,
  prenom: String,
  email: String,   
  mot_de_pass: String,
  numero_telephone: String,
  pays: String,
  adresse: String,
  email_verif: Boolean,
  
    
},
{
  timestamps: true
}
);

module.exports = Utilisateur = mongoose.model('users', UserSchema);
