const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const ObjectId = mongoose.Schema.Types.ObjectId;

const BlogSchema = new Schema({
    title: { type: String, required: true},
    article: { type: String, required: true},
    published: { type: Date, required: true},
    featured: { type: Boolean, required: true},
    authorId: { type: Schema.Types.ObjectId, required: false},
    author: { type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Blog', BlogSchema);