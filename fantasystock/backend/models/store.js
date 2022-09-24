const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findorCreate = require("mongoose-findorcreate");
const Product = require("./product");

const StoreSchema = new Schema({
  inventory: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
  },
});

StoreSchema.plugin(findorCreate);

module.exports = mongoose.model("Store", StoreSchema);
