const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdresseSchema = require('./adresse.js').schema;
const ArticleSchema = require('./article.js').schema;

// Create Schema
const DevisSchema = new Schema({
  
  
  prix_ht: String,
  prix_ttc: String,
  articles: [
    {
      article:ArticleSchema,
      qte: Number
    }
  ],
  noarticles: [
    {
      article:ArticleSchema,
      qte: Number
    }
  ],
  marque: { type: Schema.Types.ObjectId, ref: "marques" },
  client: { type: Schema.Types.ObjectId, ref: "clients" },
  user: { type: Schema.Types.ObjectId, ref: "users" },//
  statut: String,
  remise: String,
  tva: String,

  devise: String,
  
},
{
  timestamps: true
}
);

module.exports = Devis = mongoose.model('devis', DevisSchema);
