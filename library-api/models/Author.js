import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    bio: String,
    fechaNacimiento: { type: Date, required: true},
    nacionalidad: {type: String, required: true},
    libros: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}]
});

const Author = mongoose.model('Author', authorSchema);
export default Author;