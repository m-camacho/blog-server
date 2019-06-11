import mongoose from 'mongoose';
const { Schema } = mongoose;

var authorSchema = new Schema({
    _id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

var Author = mongoose.model('Author', authorSchema);
export default Author;
