const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MarqueSchema = new Schema({
  nom: String,
  image: String,
    
},
{
  timestamps: true
}
);

module.exports = Marque = mongoose.model('marques', MarqueSchema);
