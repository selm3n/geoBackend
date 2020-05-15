const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdresseSchema = require('./adresse.js').schema;
const ArticleSchema = require('./article.js').schema;

// Create Schema
const MoteurSchema = new Schema({
  
  
  marque: { type: Schema.Types.ObjectId, ref: "marques" },
  model: String,
  num_serie: String,
  num_arrg: String,
  monte_engin: String,
  num_parq: String,
  engin: { type: Schema.Types.ObjectId, ref: "engins" },
  
  client: { type: Schema.Types.ObjectId, ref: "clients" },
  
},
{
  timestamps: true
}
);

module.exports = Moteur = mongoose.model('moteurs', MoteurSchema);