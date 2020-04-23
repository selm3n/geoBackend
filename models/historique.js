const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const HistoriqueSchema = new Schema({
  mot_cherche: String,
  client: { type: Schema.Types.ObjectId, ref: "clients" }
},
{
  timestamps: true
}
);

module.exports = Marque = mongoose.model('historiques', HistoriqueSchema);
