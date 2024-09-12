// IMPORTS & CONSTANTS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { and } = require('sequelize');
const port = process.argv[2] || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TABLAS
const Choferes = require("./models/modelo.js").models.Choferes;
const Vehiculos = require('./models/modelo.js').models.Vehiculos;
const Habilitaciones = require('./models/modelo.js').models.Habilitaciones;

//Por erores de CORS OJO ESTO SOLO DEBUG
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//HOST CARPETA PUBLIC - index.html
app.use(express.static('public'));


/*--------------------------------------------CRUD----------------------------------------------*/
/*              CHOFERES          */
//CREATE
app.post('/choferes', async (req, res) => {
    const { id, nombre, apellido, dni, licencia, edad } = req.body;
    try {
        await Choferes.create({ id_chofer: id, nombre, apellido, dni, licencia, edad });
        res.send('Chofer creado con éxito');
    } catch (error) {
        console.error("Error al crear chofer:", error);
        res.status(500).send('Error al crear chofer');
    }
});

//READ ALL
app.get('/choferes', async (req, res) => {
    try {
        const choferes = await Choferes.findAll();
        res.json(choferes);
    } catch (error) {
        console.error("Error al leer choferes:", error);
        res.status(500).send('Error al leer choferes');
    }
});

//READ BY DNI
app.get('/choferes/:dni', async (req, res) => {
    try {
        let chofer = await Choferes.findOne({ where: {dni:req.params.dni} });
        res.json(chofer);
    } catch (error) {
        console.error("Error al leer chofer:", error);
        res.status(500).send('Error al leer chofer');
    }
});

//UPDATE BY DNI
app.put('/choferes/:dni', async (req, res) => {
    const { dni } = req.params;
    const { nombre, apellido, edad } = req.body;
    try {
        await Choferes.update({ nombre, apellido, edad }, { where: { dni } });
        res.send('Datos de chofer actualizados con éxito');
    } catch (error) {
        console.error("Error al actualizar chofer:", error);
        res.status(500).send('Error al actualizar chofer');
    }
});

//DELETE BY DNI
app.delete('/choferes/:dni', async (req, res) => {
    const { dni } = req.params;
    try {
        await Choferes.destroy({ where: { dni } });
        res.send('Chofer eliminado con éxito');
    } catch (error) {
        console.error("Error al eliminar chofer:", error);
        res.status(500).send('Error al eliminar chofer');
    }
});



/*              VEHICULOS          */
//CREATE
app.post('/vehiculos', async (req, res) => {
    const { id, patente, carga_util, licencia_minima, en_uso } = req.body;
    try {
        await Vehiculos.create({ id_vehiculo: id, patente, carga_util, licencia_minima, en_uso });
        res.send('Vehiculo creado con éxito');
    } catch (error) {
        console.error("Error al crear vehiculo:", error);
        res.status(500).send('Error al crear vehiculo');
    }
});

//READ ALL
app.get('/vehiculos', async (req, res) => {
    try {
        const vehiculos = await Vehiculos.findAll();
        res.json(vehiculos);
    } catch (error) {
        console.error("Error al leer vehiculos:", error);
        res.status(500).send('Error al leer vehiculos');
    }
});

//READ BY PATENTE
app.get('/vehiculos/:patente', async (req, res) => {
    try {
        let vehiculo = await Vehiculos.findOne({ where: {patente:req.params.patente} });
        res.json(vehiculo);
    } catch (error) {
        console.error("Error al leer vehiculo:", error);
        res.status(500).send('Error al leer vehiculo');
    }
});

//UPDATE BY PATENTE
app.put('/vehiculos/:patente', async (req, res) => {
    const { patente } = req.params;
    const { carga_util, licencia_minima, en_uso } = req.body;
    try {
        await Choferes.update({ carga_util, licencia_minima, en_uso }, { where: { patente } });
        res.send('Datos de vehiculo actualizados con éxito');
    } catch (error) {
        console.error("Error al actualizar vehiculo:", error);
        res.status(500).send('Error al actualizar vehiculo');
    }
});

//DELETE BY PATENTE
app.delete('/vehiculos/:patente', async (req, res) => {
    const { patente } = req.params;
    try {
        await Vehiculos.destroy({ where: { patente } });
        res.send('Vehiculo eliminado con éxito');
    } catch (error) {
        console.error("Error al eliminar vehiculo:", error);
        res.status(500).send('Error al eliminar vehiculo');
    }
});



/*              HABILITACIONES          */
//CREATE
app.post('/habilitaciones', async (req, res) => {
    const { id_chofer, id_vehiculo } = req.body;
    try {
        await Habilitaciones.create({ id_chofer, id_vehiculo });
        res.send('Habilitacion creada con éxito');
    } catch (error) {
        console.error("Error al crear habilitacion:", error);
        res.status(500).send('Error al crear habilitacion');
    }
});

//READ ALL
app.get('/habilitaciones', async (req, res) => {
    try {
        const habilitaciones = await Habilitaciones.findAll();
        res.json(habilitaciones);
    } catch (error) {
        console.error("Error al leer habilitaciones:", error);
        res.status(500).send('Error al leer habilitaciones');
    }
});

//READ BY ID_CHOFER/ID_VEHICULO
app.get('/habilitaciones/:id_chofer/:id_vehiculo', async (req, res) => {
    try {
        let habilitacion = await Habilitaciones.findOne({where: {id_chofer:req.params.id_chofer, id_vehiculo:req.params.id_vehiculo}});
        res.json(habilitacion);
    } catch (error) {
        console.error("Error al leer habilitacion:", error);
        res.status(500).send('Error al leer habilitacion');
    }
});

//UPDATE BY ID_CHOFER/ID_VEHICULO
app.put('/habilitaciones/:id_chofer/:id_vehiculo', async (req, res) => {
    const { new_id_chofer, new_id_vehiculo } = req.body;
    try {
        await Habilitaciones.update({ new_id_chofer, new_id_vehiculo }, { where: {id_chofer:req.params.id_chofer, id_vehiculo:req.params.id_vehiculo} });
        res.send('Datos de habilitacion actualizados con éxito');
    } catch (error) {
        console.error("Error al actualizar habilitacion:", error);
        res.status(500).send('Error al actualizar habilitacion');
    }
});

//DELETE BY ID_CHOFER/ID_VEHICULO
app.delete('/habilitaciones/:id_chofer/:id_vehiculo', async (req, res) => {
    const { id_chofer } = req.params.id_chofer;
    const { id_vehiculo } =  req.params.id_vehiculo;
    try {
        await Habilitaciones.destroy({ where: { id_chofer, id_vehiculo } });
        res.send('Habilitaciones eliminado con éxito');
    } catch (error) {
        console.error("Error al eliminar habilitaciones:", error);
        res.status(500).send('Error al eliminar habilitaciones');
    }
});



/*--------------------------------------------CRUD----------------------------------------------*/


//SERVER
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});