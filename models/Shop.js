const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: String,
    type: String,
    location: String,
    ownerId: String,  // Owner's ID to link the shop to the specific owner
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
