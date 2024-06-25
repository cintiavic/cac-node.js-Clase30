/**
 * Router: Un router en Express es una manera de agrupar rutas relacionadas.
 * Es como un mini-servidor dentro del servidor principal.
 * Ayuda a organizar el código cuando tienes muchas rutas.
 * Cuando accedes a '/movies/sub_ruta' en tu navegador
 * o herramienta como Postman, la aplicación:
 * Primero busca la ruta '/movies' en el archivo principal (server.js).
 * Luego delega el manejo de esa ruta al router moviesRouter.
 * Finalmente, dentro de moviesRouter, encuentra la subruta '/list'
 * y ejecuta la función correspondiente que devuelve "sub_ruta".
 */

//1- Importamos el módulo express
const express = require("express");
const path = require("path");

//2- Instanciamos Router de express
const router = express.Router();

//3- Importamos el controlaodr de funciones
const movieController = require("../controllers/movieControllers");

//4- Planteamos las solicitudes GET POST PUT y DELETE

// ruta del listado general
router.get("/list", movieController.getAllMovies);

// ruta para consultas paramétricas
router.get("/:id", movieController.getMovieById);

// ruta para crear películas
router.post("/create", movieController.createMovie);

// ruta para actualizar películas
router.put("/:id", movieController.updateMovie);

// ruta para borrar película
router.delete("/:id", movieController.deleteMovie);

// Exportamos el módulo
module.exports = router;

