const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: String,
    product_id: String,
    text: String,
});

CommentSchema.index({text: 'text'});

module.exports =  mongoose.model('comment', CommentSchema);
