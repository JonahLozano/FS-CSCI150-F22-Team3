const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findorCreate = require("mongoose-findorcreate");

const UserSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.plugin(findorCreate);

module.exports = mongoose.model("User", UserSchema);
