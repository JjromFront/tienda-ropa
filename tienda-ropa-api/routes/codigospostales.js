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
        console.log("📤 Codigos Postales corriendo exitosamente!")
    }
});

// Función para ejecutar una consulta con promesas
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

// Ruta para obtener todos los códigos postales
router.get('/', async (req, res) => {
    const query = 'SELECT * FROM codigospostales';
    try {
        const columns = await executeQuery(query);
        res.send(columns);
    } catch (error) {
        console.error('Error al obtener los códigos postales:', error);
        res.status(500).json({ error: 'Error al obtener los códigos postales' });
    }
});

// Ruta para obtener solo los códigos postales de la tabla
router.get('/informacion', async (req, res) => {
    const query = 'SELECT codigo_postal FROM codigospostales';
    try {
        const result = await executeQuery(query);
        res.json(result);
    } catch (error) {
        console.error('Error al obtener la información de los códigos postales:', error);
        res.status(500).json({ error: 'Error al obtener la información de los códigos postales' });
    }
});

router.post('/', async (req, res) => {
    const data = req.body;
    const query = 'INSERT INTO codigospostales SET ?';

    try {
        await executeQuery(query, data);
        res.json({ message: 'Creación exitosa' });
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
});

// Ruta para eliminar un cliente por su dni
router.delete('/:codigo_postal', async (req, res) => {
    const codigo_postal = req.params.codigo_postal;
    const query = 'DELETE FROM codigospostales WHERE codigo_postal = ?';

    try {
        await executeQuery(query, codigo_postal);
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
});

// Ruta para actualizar un cliente por su dni
router.put('/:codigo_postal', async (req, res) => {
    const codigo_postal = req.params.codigo_postal;
    const newData = req.body;
    const query = 'UPDATE codigospostales SET ? WHERE codigo_postal = ?';

    try {
        await executeQuery(query, [newData, codigo_postal]);
        res.json({ message: 'Cliente actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
});

module.exports = router;
