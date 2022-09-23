const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findorCreate = require("mongoose-findorcreate");

const User = require('./user');     // requiring user.js to be able to reference the user who is commenting

const CommentSchema = new Schema({
    content:{
        type: String,
        required: true
    },
    entryDate:{
        type: Date,
        required: true,
        default: Date.now
    },
    user:{
        type: Schema.Types.ObjectId,    // referencing the user for the comment
        ref: 'User'
    }
});

//const Comment = mongoose.model("Comment", CommentSchema);

//const mySchema = {'Users': User, 'Comments': Comment}

CommentSchema.plugin(findorCreate);

module.exports = mongoose.model("Comment", CommentSchema);