const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findorCreate = require("mongoose-findorcreate");

const StockSchema = new Schema({
  ticker: {
    type: String,
    required: true,
    unique: true,
  },
  price: Number,
  lastUpdated: Date,
});

UserSchema.plugin(findorCreate);

module.exports = mongoose.model("Stock", StockSchema);
