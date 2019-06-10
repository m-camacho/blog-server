import mongoose from 'mongoose';
const { Schema } = mongoose;

var articleSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    title: String,
    short_description: String,
    long_description: String,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
});

var Article = mongoose.model('Article', articleSchema);
export default Article;
