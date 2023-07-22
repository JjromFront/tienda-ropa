// routes/ventas.js
const express = require("express");
const mysql = require("mysql");
const router = express.Router();

// Establecer parametros de conexion
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ropa_tienda'
});

//probamos la conexion
connection.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log("📤 Ventas corriendo exitosamente!")
    }
});

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM ventas';
        const rows = await executeQuery(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los ventas:', error);
        res.status(500).json({ error: 'Error al obtener los ventas' });
    }
});

function executeQuery(query, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = router;
