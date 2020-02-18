const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PatientSchema = new Schema({
  nom: String,
  prenom: String,
  email: String,   
  mot_de_pass: String,
  cle_api: String,
  photo_attestation_carte_vitale_id: String,
  photo_carte_mutuelle_id: String,
  photo_cmu_id: String,
  code_authentification: String,
  compte_active: Boolean,
  date_naissance: Date,
  sexe: String,
  numero_telephone: String,
  pays: String,
  adresse: String,
  numero_residence: String,
  code_immeuble: String,
  etage: String,
  code_postal: String,
  nom_mutuelle: String,
  latitude_adresse: Number,
  longitude_adresse: Number,
  device_reg_id: String,
  device_id: String,
  device_type: String,
  donnees_mango_id: Number,
  photo_du_profile_id: Number,
  numSecuriteSociale: String,
  dateFinDroit: String,
  caisseAffiliation: String,
  profil_complet: Boolean,
  date_ajout: Date,
  email_verif: Boolean,
  version_android: String,
  version_ios: String,
    
},
{
  timestamps: true
}
);

module.exports = Patient = mongoose.model('patients', PatientSchema);
