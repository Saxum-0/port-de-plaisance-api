const mongoose = require('mongoose');

const CatwaySchema = new mongoose.Schema({
    catwayNumber: String,
    type: String,
    catwayState: String
});


const Catway = mongoose.models.Catway || mongoose.model('Catway', CatwaySchema);

module.exports = Catway;
