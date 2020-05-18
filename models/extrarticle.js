const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExtrarticleSchema = new Schema({

  marque: { type: Schema.Types.ObjectId, ref: "marques" },
  ref: String,
  qte: Number,
  model: String,
  num_serie: String,

  fournisseur: String,
  nom: String,
  
  description: String,

  client: { type: Schema.Types.ObjectId, ref: "clients" },
  user: { type: Schema.Types.ObjectId, ref: "users" },
  added_to_articles: Boolean,
  qte_manquante: Number,

},
{
  timestamps: true
}
);

module.exports = Extrarticle = mongoose.model('extrarticles', ExtrarticleSchema);
