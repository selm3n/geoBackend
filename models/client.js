const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdresseSchema = require('./adresse.js').schema;

// Create Schema
const ClientSchema = new Schema({
  type: String,
  civilite: String,
  nom: String,
  prenom: String,
  rs: String,
  email: String,   
  tel_fixe: String,
  adresses: [
    //_id: false,
    AdresseSchema
  ],
  cp: String,
  pays: String,
  ville: String,
  news_letter: Boolean,
  ip: String,
  mot_de_pass: String,
  status: String,
  compte: String,
  activite: String,
  siren: String,
  tva_intra: String,
  fonction: String,
  nom_resp_achat: String,
  tel_mobile: String,
  interet: String,

  reset_password_token: String,
  reset_password_expires: String,

  compte_active: Boolean,
  
  
},
{
  timestamps: true
}
);

module.exports = Client = mongoose.model('clients', ClientSchema);
