//Modelo y carga de datos iniciales
const{Sequelize,Model,DataTypes}=require('sequelize');
//para no hacer login //super borrador en desarrollo
const options={loggin: false};
//especifico tipo de DDBB
const sequelize = new Sequelize("sqlite:dbLogistica.sqlite",options);


// TABLA CHOFERES
class Choferes extends Model{}
Choferes.init({
    id_chofer:   {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    nombre:      DataTypes.STRING,  
    apellido:    DataTypes.STRING,
    dni:         DataTypes.STRING,
    licencia:    DataTypes.STRING,
    edad:        DataTypes.INTEGER,
},
{sequelize, modelName:"Choferes"});

// TABLA VEHICULOS
class Vehiculos extends Model{}
Vehiculos.init({
    id_vehiculo:        {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},  
    patente:            DataTypes.STRING,  
    carga_util:         DataTypes.REAL,
    licencia_minima:    DataTypes.STRING,
    en_uso:             DataTypes.INTEGER,
},
{sequelize, modelName:"Vehiculos"});

// TABLA HABILITACIONES - Relacion entre VEHICULOS Y CHOFERES
const Habilitaciones = sequelize.define('Habilitaciones', {
    id_chofer:      {type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
    id_vehiculo:    {type: DataTypes.INTEGER, allowNull: false, primaryKey: true}
},
{sequelize, modelName:"Habilitaciones"});

Choferes.belongsToMany(Vehiculos,{
    as:'Puede conducir',        //nombre de la relacion de ida
    foreignKey: 'id_chofer',    //extranjera de origen
    otherKey:'id_vehiculo',     //extranjera de llegada
    through:'Habilitaciones'    //Nombre de la tabla intermedia
});

Vehiculos.belongsToMany(Choferes,{
    as:'Puede ser conducido por',   //nombre de la relacion de ida
    foreignKey: 'id_vehiculo',      // extranjera de origen
    otherKey:'id_chofer',           //extranjera de llegada
    through:'Habilitaciones'        //Nombre de la tabla intermedia
});


module.exports = sequelize;