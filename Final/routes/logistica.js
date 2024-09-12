const router = require('express').Router();

//Import our authentication middleware function
const authMiddleware = require('./authMiddleware');
const { Choferes,Vehiculos,Habilitaciones, sequelizeusers, sequelizelogistica } = require("../modelos.js");
//This is a protected route - we pass in the authMiddleware function to verify the JWT token before returning anything.


/*--------------------------------------------CRUD----------------------------------------------*/
/*              CHOFERES          */
//curl -X GET -H "auth-token:`cat archivo_token.txt`" http://localhost:3000/api/logistica/choferes

//CREATE CHOFER
router.post('/choferes', authMiddleware, async (req, res) => {
    const { id, nombre, apellido, dni, licencia, edad } = req.body;
    try {
        await Choferes.create({ id_chofer: id, nombre, apellido, dni, licencia, edad });
        res.send('Chofer creado con éxito!');
    } catch (error) {
        console.error("Error al crear chofer:", error);
        res.status(500).send('Error al crear chofer');
    }
});

// READ ALL CHOFERES
router.get('/choferes', authMiddleware, async (req, res)=>{
    try {
        const choferes = await Choferes.findAll();
        res.json(choferes);
    } catch (error) {
        console.error("Error al leer choferes:", error);
        res.status(500).send('Error al leer choferes');
    }
});

// READ CHOFER BY DNI
router.get('/choferes/:dni', authMiddleware, async (req, res) => {
    const { dni } = req.params;
    try {
        const chofer = await Choferes.findOne({ where: { dni } });
        res.json(chofer);
    } catch (error) {
        console.error("Error al leer chofer:", error);
        res.status(500).send('Error al leer chofer');
    }
});

// UPDATE CHOFER
router.put('/choferes/:dni', authMiddleware, async (req, res) => {
    const { dni } = req.params;
    const { nombre, apellido, edad } = req.body;
    try {
        await Choferes.update({ nombre, apellido, edad }, { where: { dni } });
        res.send('Datos de chofer actualizados con éxito!');
    } catch (error) {
        console.error("Error al actualizar chofer:", error);
        res.status(500).send('Error al actualizar chofer');
    }
});

// DELETE CHOFER
router.delete('/choferes/:dni', authMiddleware, async (req, res) => {
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
//curl -X GET -H "auth-token:`cat archivo_token.txt`" http://localhost:3000/api/logistica/vehiculos 

// CREATE VEHICULO
router.post('/vehiculos', authMiddleware, async (req, res) => {
    const { id, patente, carga_util, licencia_minima, en_uso } = req.body;
    try {
        await Vehiculos.create({ id_vehiculo: id, patente, carga_util, licencia_minima, en_uso });
        res.send('Vehiculo creado con éxito');
    } catch (error) {
        console.error("Error al crear vehiculo:", error);
        res.status(500).send('Error al crear vehiculo');
    }
});

// READ ALL VEHICULOS
router.get('/vehiculos', authMiddleware, async (req, res) => {
    try {
        const vehiculos = await Vehiculos.findAll();
        res.json(vehiculos);
    } catch (error) {
        console.error("Error al leer vehiculos:", error);
        res.status(500).send('Error al leer vehiculos');
    }
});

// READ BY PATENTE
router.get('/vehiculos/:patente', authMiddleware, async (req, res) => {
    try {
        let vehiculo = await Vehiculos.findOne({ where: {patente:req.params.patente} });
        res.json(vehiculo);
    } catch (error) {
        console.error("Error al leer vehiculo:", error);
        res.status(500).send('Error al leer vehiculo');
    }
});

// UPDATE BY PATENTE
router.put('/vehiculos/:patente', authMiddleware, async (req, res) => {
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

// DELETE BY PATENTE
router.delete('/vehiculos/:patente', authMiddleware, async (req, res) => {
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
//curl -X GET -H "auth-token:`cat archivo_token.txt`" http://localhost:3000/api/logistica/habilitaciones

// CREATE HABILITACION
router.post('/habilitaciones', authMiddleware, async (req, res) => {
    const { id_chofer, id_vehiculo } = req.body;
    try {
        await Habilitaciones.create({ id_chofer, id_vehiculo });
        res.send('Habilitacion creada con éxito');
    } catch (error) {
        console.error("Error al crear habilitacion:", error);
        res.status(500).send('Error al crear habilitacion');
    }
});

// READ ALL HABILITACIONES
router.get('/habilitaciones', authMiddleware, async (req, res) => {
    try {
        const habilitaciones = await Habilitaciones.findAll();
        res.json(habilitaciones);
    } catch (error) {
        console.error("Error al leer habilitaciones:", error);
        res.status(500).send('Error al leer habilitaciones');
    }
});

// READ BY ID_CHOFER/ID_VEHICULO
router.get('/habilitaciones/:id_chofer/:id_vehiculo', authMiddleware, async (req, res) => {
    try {
        let habilitacion = await Habilitaciones.findOne({where: {id_chofer:req.params.id_chofer, id_vehiculo:req.params.id_vehiculo}});
        res.json(habilitacion);
    } catch (error) {
        console.error("Error al leer habilitacion:", error);
        res.status(500).send('Error al leer habilitacion');
    }
});

// UPDATE BY ID_CHOFER/ID_VEHICULO
router.put('/habilitaciones/:id_chofer/:id_vehiculo', authMiddleware, async (req, res) => {
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
router.delete('/habilitaciones/:id_chofer/:id_vehiculo', authMiddleware, async (req, res) => {
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

module.exports = router;