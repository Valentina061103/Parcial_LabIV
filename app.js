import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express';
import bookRoutes from './library-api/routes/Books.js';
import authorRoutes from './library-api/routes/Authors.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT,()=> console.log(`servidor en puerto ${PORT}`));

//conexion a mongoDB
mongoose.connect(process.env.MONGO_URI,)
.then(()=> console.log('MongoDB conectado'))
.catch(()=> console.error('Error al conectar'))
