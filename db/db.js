/**
 * Finalmente el archivo db.js será el que cree el objeto que conecta con la base de datos. 
 * Esa conexión utilizará el objeto mysql provisto en en el módulo mysql2
 */

//Importación del modulo mysql2
const mysql = require("mysql2");

//Objeto de configuración para la base de datos
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    port: 3306,
    /* database: "movies_db" */
});

//Conectar con la base de datos
connection.connect((error) => {
    if (error) {
        console.log("Error de conexión con la base de datos"+error);
        return;
    } else {
        console.log("Conectado a la base de datos");
    }
});

//Verificación de la base de datos
const sql = 'CREATE DATABASE IF NOT EXISTS movies_db';
    
connection.query(sql,(err,result)=>{
    if (err) {
        console.error('Error al crear la base de datos:', err);
        return; 
    }
    console.log('Base de datos creada o existente');

    //ubicación en la BD
    connection.changeUser({database: 'movies_db'}, (err) => {
        if (err) {
            console.error('Error al cambiar la base de datos:', err);
            return;
        }
        //En caso de estar todo ok
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS movies (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                director VARCHAR(255) NOT NULL,
                year INT NOT NULL
            );
        `;

        // Pasamos la consulta a la bd
        connection.query(createTableQuery, (err,results)=>{
            // en caso de error
            if (err) {
                console.error('Error al crear la tabla:', err);
                return;
            }

            //Exito
            console.log("Tabla: CREADA/EXISTENTE/GARANTIZADA 👌");
        })

})

})


//Exportar la base de datos
module.exports = connection