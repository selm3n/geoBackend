const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ImmobilierSchema = new Schema({
  transaction: String,
  chambres: Number,
  sale_de_bain: Number,
  superficie: String,
  

    
},
{
  timestamps: true
}
);

module.exports = Immobilier = mongoose.model('immobiliers', ImmobilierSchema);
