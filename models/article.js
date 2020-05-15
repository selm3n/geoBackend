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
  marque: { type: Schema.Types.ObjectId, ref: "marques" },
  categorie: String,
  adaptable: Boolean,
  remise: Number,
  nom: String,
  tva: Number,
  image: String,

  poids_carton: String,
  volume_carton: String,
  prix_remise: String,
  monnaie: String,
  code_remise: String,
  pourcentage_remise: String,
  unite_vente: String,
  carton_euro: String,
  palette_euro: String,
  palette_qte: Number,
  code_douanier: String,
  ean_code: String,
  pays_origine: String,
  hazardous_good: String,
  longueur: Number,
  largeur: Number,
  hauteur: Number,
  
  subpac_type: String,
  subpac_longueur: Number,
  subpac_largeur: Number,
  subpac_hauteur: Number,
  subpac_poids: String,
  subpac_qte: Number,
  carton_type: String,
  longueur_carton: Number,
  largeur_carton: Number,
  hauteur_carton: Number,
  carton_qte: Number,
  source: String,
 

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
