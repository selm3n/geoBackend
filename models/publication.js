const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PublicationSchema = new Schema({
  titre: String,
  prix: String,
  gouvernorat: String,
  departement: String,
  type: String,//vehicule,immobilier,maison_et_jardin,sports_loisirs,
  //informatique_multimedia,emploi_service,habillement,entreprises
  images: [
    String
    // {
    //   _id: false,
    //   image: String,
    // }
  ],
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "users" }
},
{
  timestamps: true
}
);

module.exports = Publication = mongoose.model('publications', PublicationSchema);
