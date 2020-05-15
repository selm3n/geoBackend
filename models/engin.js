const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdresseSchema = require('./adresse.js').schema;
const ArticleSchema = require('./article.js').schema;

// Create Schema
const EnginSchema = new Schema({
  
  
  marque: { type: Schema.Types.ObjectId, ref: "marques" },
  type: String,
  model: String,
  num_serie: String,
  immatriculation: String,
  num_parq: String,
  moteur: { type: Schema.Types.ObjectId, ref: "moteurs" },

  client: { type: Schema.Types.ObjectId, ref: "clients" },
  
},
{
  timestamps: true
}
);

module.exports = Engin = mongoose.model('engins', EnginSchema);