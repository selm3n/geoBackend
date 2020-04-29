const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Create Schema
const AdresseSchema = new Schema({
  
  adr_nom: String,
  adr_prenom: String,
  adr_nom_societe: String,
  adr_pays: String,
  adr_cp: String,
  adr_ville: String,
  adr_primaire: String,
  adr_secondaire: String,
  adr_tel_fixe: String,
  adr_tel_mobile: String,
  
},
{
  timestamps: true
}
);

module.exports = Adresse = mongoose.model('adresses', AdresseSchema);
