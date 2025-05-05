import express from 'express';
import{
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    addBookToAuthor,
} from '../controllers/authorController.js'

const router = express.Router();

router.get('/', getAuthors);
router.get('/',getAuthorById);
router.post('/',createAuthor);
router.put('/:id',updateAuthor);
router.delete('/:id',deleteAuthor);

//ruta asignar autor
router.put('/:id/addBook/:bookId', addBookToAuthor)

export default router;