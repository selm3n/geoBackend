const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdresseSchema = require('./adresse.js').schema;
const ArticleSchema = require('./article.js').schema;

// Create Schema
const CommandeSchema = new Schema({
  
  
  prix_ht: String,
  prix_ttc: String,
  articles: [
    {
      article:ArticleSchema,
      qte: Number
    }
  ],
  adr_livraison: String,//AdresseSchema,
  adr_facturation: String,//AdresseSchema,
  client: { type: Schema.Types.ObjectId, ref: "clients" },
  user: { type: Schema.Types.ObjectId, ref: "users" },//
  statut: String,
  remise: String,
  tva: String,
  
  devis: String,
  payment_id: String,

  devise: String,
  
},
{
  timestamps: true
}
);

module.exports = Commande = mongoose.model('commandes', CommandeSchema);
