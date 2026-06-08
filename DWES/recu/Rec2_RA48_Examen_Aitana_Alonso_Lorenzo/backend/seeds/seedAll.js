const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongodbConfig = require("../utils/mongodb.config");

// Importación de modelos
const Categoria = require("../models/categoria.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Book = require("../models/book.model"); //

const ejecutar = async () => {
    try {
        // 1. Conexión a la base de datos
        await mongodbConfig.conectarMongoDB();
        console.log("--- Conectado con MongoDB ---");

        // 2. Limpieza de colecciones (Borrado total)
        console.log("Limpiando base de datos...");
        await Categoria.deleteMany({});
        await Comment.deleteMany({});
        await User.deleteMany({});
        await Book.deleteMany({}); // Limpiamos la colección de libros
        console.log("Base de datos limpia.");

        // 3. Inserción de Usuarios
        console.log("Insertando usuarios...");        
        const usuariosParaInsertar = [
            {
                username: "admin",
                password: await bcrypt.hash("Admin123@", 12),
                profile: "ADMIN"
            },
            {
                username: "user",
                password: await bcrypt.hash("User123@", 12),
                profile: "USER"
            }
        ];
        await User.insertMany(usuariosParaInsertar);
        console.log("Usuarios creados.");

        // 4. Inserción de Categorías
        console.log("Insertando categorías...");
        const categoriasData = [
            { nombre: "Fantasía" },
            { nombre: "Ciencia Ficción" },
            { nombre: "Drama" },
            { nombre: "Terror" },
            { nombre: "Histórica" },
        ];
        const categoriasCreadas = await Categoria.insertMany(categoriasData);
        console.log("Categorías insertadas.");

        // 5. Inserción de 10 Libros
        console.log("Insertando 10 libros de prueba...");
        const librosParaInsertar = [];
        
        for (let i = 1; i <= 10; i++) {
            // Seleccionamos una categoría aleatoria para el campo 'genre'
            const catAleatoria = categoriasCreadas[Math.floor(Math.random() * categoriasCreadas.length)];
            
            librosParaInsertar.push({
                title: `Libro Ejemplo ${i}`,
                author: `Autor Talentoso ${i}`,
                genre: catAleatoria.nombre, // Usamos el nombre de la categoría
                year: 1990 + i,
                description: `Una descripción fascinante para el libro número ${i}.`,
                stock: Math.floor(Math.random() * 20) + 1
            });
        }
        
        await Book.insertMany(librosParaInsertar); //
        console.log("10 Libros insertados correctamente.");

        console.log("\n--- SEED FINALIZADA CON ÉXITO ---");

    } catch (error) {
        console.error("Error durante la ejecución de la seed:", error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

ejecutar();