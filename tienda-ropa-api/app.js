// app.js
const express = require("express");
const cors = require('cors');
require('dotenv').config();
const clientesRouter = require('./routes/clientes');
const codigosPostalesRouter = require('./routes/codigospostales');
const productosRouter = require('./routes/productos');
const proveedoresRouter = require('./routes/proveedores');
const ventasRouter = require('./routes/ventas');

const app = express();
const puerto = process.env.PUERTO;

app.use(cors());
app.use(express.json());

// Importar y usar los enrutadores
app.use('/api/clientes', clientesRouter);
app.use('/api/codigospostales', codigosPostalesRouter);
app.use('/api/productos', productosRouter);
app.use('/api/proveedores', proveedoresRouter);
app.use('/api/ventas', ventasRouter);

app.listen(puerto, () => {
    console.log(`🚀 Running server on port ${puerto}`);
});
