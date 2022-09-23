const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findorCreate = require("mongoose-findorcreate");

const StoreSchema = new Schema({
    product:{
        type: String,
        required: true
    },
    image:{     // holds the image filename so that it can then be displayed on the client-side
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    }
});

StoreSchema.plugin(findorCreate);

module.exports = mongoose.model("Store", StoreSchema);