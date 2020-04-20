const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ArticleSchema = new Schema({

  ref: String,
  ref_geo: String,
  fournisseur: String,
  designation: String,
  prix_achat: String,
  prix_vente: String,
  qte: Number,
  poids: String,
  volume: String,
  marque: String,
  categorie: String,
  adaptable: Boolean,
  remise: Number,
  nom: String,
  tva: Number,
  image: String,
  files: [
    String
  ],
  description: String,
  
  //user: { type: Schema.Types.ObjectId, ref: "users" }
},
{
  timestamps: true
}
);

module.exports = Article = mongoose.model('articles', ArticleSchema);
