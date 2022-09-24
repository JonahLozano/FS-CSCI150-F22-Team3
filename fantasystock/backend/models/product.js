const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findorCreate = require("mongoose-findorcreate");

const ProductSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  image: {
    // holds the image filename so that it can then be displayed on the client-side
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

ProductSchema.plugin(findorCreate);

module.exports = mongoose.model("Store", ProductSchema);
