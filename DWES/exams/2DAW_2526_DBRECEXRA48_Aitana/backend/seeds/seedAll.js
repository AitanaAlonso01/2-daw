const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongodbConfig = require("../utils/mongodb.config");

// Importación de modelos
const Categoria = require("../models/categoria.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");

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
        console.log("Usuarios (Admin y User) creados correctamente.");

        // 4. Inserción de Categorías
        console.log("Insertando categorías...");
        const categoriasData = [
            { nombre: "deportes" },
            { nombre: "moda" },
            { nombre: "política" },
            { nombre: "tecnología" },
            { nombre: "cine" },
        ];
        const categoriasCreadas = await Categoria.insertMany(categoriasData);
        console.log("Categorías insertadas.");

        // 5. Inserción de 10 Comentarios
        // Usamos los IDs de las categorías recién creadas para que la relación sea válida
        console.log("Insertando 10 comentarios de prueba...");
        const comentariosParaInsertar = [];
        
        for (let i = 1; i <= 10; i++) {
            // Seleccionamos una categoría aleatoria de las creadas
            const categoriaAleatoria = categoriasCreadas[Math.floor(Math.random() * categoriasCreadas.length)];
            
            comentariosParaInsertar.push({
                usuario: i % 2 === 0 ? "admin" : "user", // Alternamos autores
                opinion: `Esta es la opinión número ${i} sobre ${categoriaAleatoria.nombre}`,
                categoria: categoriaAleatoria._id, // FK real
                valoracion: Math.floor(Math.random() * 6) // Valoración entre 0 y 5
            });
        }
        
        await Comment.insertMany(comentariosParaInsertar);
        console.log("10 Comentarios insertados correctamente.");

        console.log("\n--- SEED FINALIZADA CON ÉXITO ---");

    } catch (error) {
        console.error("Error durante la ejecución de la seed:", error);
    } finally {
        // Cerramos la conexión y salimos del proceso
        mongoose.connection.close();
        process.exit(0);
    }
};

ejecutar();