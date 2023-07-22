// routes/clientes.js
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
        console.log("Conexion exitosa con la base de datos");
        console.log("📤 Clientes corriendo exitosamente!")
    }
});

// Ruta para obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM clientes';
        const rows = await executeQuery(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los clientes:', error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
});

// Ruta para crear un nuevo cliente
router.post('/', async (req, res) => {
    const data = req.body;
    const query = 'INSERT INTO clientes SET ?';

    try {
        await executeQuery(query, data);
        res.json({ message: 'Creación exitosa' });
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
});

// Ruta para eliminar un cliente por su dni
router.delete('/:dni', async (req, res) => {
    const dni = req.params.dni;
    const query = 'DELETE FROM clientes WHERE dni = ?';

    try {
        await executeQuery(query, dni);
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
});

// Ruta para actualizar un cliente por su dni
router.put('/:dni', async (req, res) => {
    const dni = req.params.dni;
    const newData = req.body;
    const query = 'UPDATE clientes SET ? WHERE dni = ?';

    try {
        await executeQuery(query, [newData, dni]);
        res.json({ message: 'Cliente actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});

// Función para ejecutar una consulta a la base de datos
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
