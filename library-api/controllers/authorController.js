    import Author from '../models/Author.js';
    import Book from '../models/Book.js';

    // traer los autores
    export const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find().populate('libros');
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener autores' });
    }
    };

    // traer un autor por ID
    export const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('libros');
        if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
        res.json(author);
    } catch (err) {
        res.status(400).json({ error: 'ID inválido' });
    }
    };

    // Crear un autor
    export const createAuthor = async (req, res) => {
    try {
        const { nombre, bio, fechaNacimiento, nacionalidad } = req.body;

        if (!nombre || !fechaNacimiento || !nacionalidad) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const newAuthor = new Author({ nombre, bio, fechaNacimiento, nacionalidad });
        const savedAuthor = await newAuthor.save();
        res.status(201).json(savedAuthor);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear autor' });
    }
    };

    // Editar un autor
    export const updateAuthor = async (req, res) => {
    try {
        const updated = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Autor no encontrado' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar autor' });
    }
    };

    // Eliminar un autor
    export const deleteAuthor = async (req, res) => {
    try {
        const deleted = await Author.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Autor no encontrado' });
        res.json({ message: 'Autor eliminado correctamente' });
    } catch (err) {
        res.status(400).json({ error: 'Error al eliminar autor' });
    }
    };

    // Agregar un libro a un autor
    export const addBookToAuthor = async (req, res) => {
    const { id, bookId } = req.params;

    try {
        const author = await Author.findById(id);
        const book = await Book.findById(bookId);

        if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
        if (!book) return res.status(404).json({ error: 'Libro no encontrado' });

        if (author.libros.includes(bookId)) {
        return res.status(400).json({ error: 'El libro ya está asignado al autor' });
        }

        author.libros.push(bookId);
        await author.save();

        res.json({ message: 'Libro agregado al autor', author });
    } catch (err) {
        res.status(400).json({ error: 'Error al asignar libro al autor' });
    }
    };