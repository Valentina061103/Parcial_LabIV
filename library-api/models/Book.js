import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    resumen: String,
    genero: {type: String,required: true},
    publicacion: {type: String, required: true},
    disponible: { type: Boolean, required: true}
});

const Book = mongoose.model('Book', bookSchema);
export default Book;