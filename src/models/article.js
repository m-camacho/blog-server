import mongoose from 'mongoose';
const { Schema } = mongoose;

var articleSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    short_description: String,
    long_description: String,
    authors: [String],
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
});

var Article = mongoose.model('Article', articleSchema);
export default Article;
