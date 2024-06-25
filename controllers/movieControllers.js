/**
 * El controlador es el que tendrá los cambios más importantes 
 * y es el que hará el tratamiento de la información.
 * En este archivo tenemos que codificar los métodos
 * .getAllMovies
 * .getMovieById
 * .createMovie
 * .updateMovie
 * .deleteMovie
 */


// 1. Importamos el módulo db
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos.

const db = require ("../db/db.js");

// 2. método getAllMovies

const getAllMovies = (req,res) =>{
    //Creamos la consulta para traer todas las pelis
    const sql = "SELECT * FROM movies";
    //Enviamos la consulta a la bbdd
    db.query(sql, (error, results)=>{
        //si sale mal, me tira info en error. si sale bien, me deja los resultados en results
        if (error) {throw error}
        res.json(results);
    });
};

const getMovieById = (req,res) => {

    //obtenermos el id solicitado

    const {id} = req.params; //es lo mismo que hacer const id  = req.params.id
    
    //Creamos la consulta para traer esa peli por id.
    // el "?" es un marcador de posición. Cargará el id en ese lugarcito nada mas.

    const sql = 'SELECT * FROM movies WHERE id = ?';

    //Enviamos la consulta
    //En el primer parámetro va la consulta, el segundo sería lo que va en el signo de pregunta. Va en array xq puedo tener mas de un marcador de posición
    db.query(sql, [id], (error,results)=>{
        if (error) {throw error}
        res.json(results);
    })
}

const createMovie = (req,res) => {
    //desestructuramos la request
    const {title, director, year} = req.body;
    //creamos la consulta
    const sql = 'INSERT INTO movies (title, director, year) VALUES (?,?,?)';
    //pasamos la consulta
    db.query(sql, [title, director, year], (error, results) => {
        if (error) {throw error}
        res.json({mensaje: "Pelicula creada"});
    })
}

const updateMovie = (req, res) => {
    //desestructuramos el objeto req
    //id está viajando en la URL.
    const {id} = req.params;
    //...pero Titulo y demás viajan escondidos en el body
    const {title, director, year} = req.body;
    //consulta con marcadores de posicion
    const sql = 'UPDATE movies SET title = ?, director = ?, year = ? WHERE id = ?;';
    //paso la consulta a la bd
    db.query(sql,
            [title, director, year, id],
            (error, results) => {
                if (error) {throw error}
                res.json({mensaje: "Película actualizada"});
            })

}

const deleteMovie = (req,res) => {
    //desestructuramos el objeto req
    //id está viajando en la url
    const {id} = req.params;
    const sql = "DELETE FROM movies WHERE id = ?;";
    db.query(sql,
            [id],
            (error, results) => {
                if (error) {throw error}
                res.json({mensaje: "Película borrada"});
            });
            
        }



module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};