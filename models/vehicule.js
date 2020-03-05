const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VehiculeSchema = new Schema({
  kilometrage: String,
  annee: String,
  marque: String,
  modele: String,
  carburant: String,
  puissance_fiscale: String,
  couleur: String,
  boite: String,

    
},
{
  timestamps: true
}
);

module.exports = Vehicule = mongoose.model('vehicules', VehiculeSchema);
