import Book from '../models/Book.js'
import Author from '../models/Author.js'

//traer los libros
export const getBooks = async(req, res) => {
    try{
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({error: 'Error al obtener libros'});
    }
}

//traer libro por ID

export const getBookById = async (req, res) => {
    try{
        const book = await Book.findById(req.params.id);
        if(!book) return res.status(404).json({error: 'Libro no encontrado'});
        res.json(book);
    } catch (err) {
        res.status(400).json({error: 'ID invalido'});
    }
};

//Crear un libro

export const createBook = async (req, res) => {
    try{
        const {titulo, resumen, genero, publicacion, disponible} = req.body;
    
        if(!titulo || !genero || !publicacion || disponible === undefined){
            return res.status(400).json({error: 'Faltan campos obligatorios'});
        }
    
        const book = new Book({titulo, resumen,genero,publicacion,disponible});
        const saveBook = await book.save();
        res.status(201).json(saveBook);
    } catch (err) {
        res.status(500).json({error:'Error al crear el libro'});
    }
};

//editar un libro

export const updateBook = async (req, res) => {
    try{
        const update = await Book.findByIdAndUpdate(req.params.id, req.body,{new: true});
        return res.status(400).json({error: 'Libro no encontrado'});
        res.json(update);
    } catch(err){
        res.status(400).json({error: 'Error al actualizar el libro'});
    }
};

//eliminar un libro
export const deleteBook = async (req, res) => {
    try{
        const authorsWithBook = await Author.find({libros: req.param.id});

        if(authorsWithBook.length > 0){
            return res.status(400).json({error: 'No se puede eliminar un libro asigando a un autor'});
        }

        const deleted = await Book.findByIdAndDelete(req.params.id);
        if(!deleted) return res.status(400).json({error:  'Libro no encontrado'});
        res.json({message: 'Libro eliminado correctamente'});
    }catch(err){
        res.status(400).json({error: 'Errror al elminar el libro'});
    }
};


