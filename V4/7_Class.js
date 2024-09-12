// IMPORTS
const Choferes = require("./modelo.js").models.Choferes;
const Vehiculos = require('./modelo.js').models.Vehiculos;
const Habilitaciones = require('./modelo.js').models.Habilitaciones;

let net = require('net');
let port = (process.argv[2]|| 7777);

// FUNCIONES
async function  CREATE_CHOFER(id,nombre,apellido,dni,licencia,edad)
{
    console.log("CREANDO CHOFER");
    try {
        let chof = await Choferes.create({id_chofer:id,nombre:nombre,apellido:apellido,dni:dni,licencia:licencia,edad:edad});
        console.log("CHOFER CREADO CON EXITO");
        return(`CHOFER CREADO CON EXITO`);
    } catch(error) {
        console.log(`ERROR AL CREAR CHOFER ${error}`);
        return(`${error}`);
    }
}

async function CREATE_Vehiculo(id, patente, carga_util, lic_minima, en_uso)
{
    console.log("CREANDO VEHICULO");
    try {
        let vehiculo = await Vehiculos.create({id_vehiculo: id, patente: patente, carga_util: carga_util, licencia_minima: lic_minima, en_uso: en_uso});
        console.log("VEHICULO CREADO CON EXITO"); 
        return(`VEHICULO CREADO CON EXITO`);
    } catch(error) {
        console.log(`ERROR AL CREAR VEHICULO ${error}`);
        return(`${error}`);
    }
}

async function  CREATE_HABILITACION(id_chof,id_vehi)
{
    console.log("CREANDO HABILITACION");
    try
    {
        let habili= await Habilitaciones.create({id_chofer:id_chof,id_vehiculo:id_vehi});
        console.log("HABILITACION CREADO CON EXITO");
        return(`HABILITACION CREADO CON EXITO`);
    }catch(error)
    {
        console.log(`ERROR AL CREAR HABILITACION ${error}`);
        return(`${error}`);
    }
}

async function READ_ALL_Choferes()
{
    try{
        let choferes = await Choferes.findAll();
        
        //mapeo array de objetos  a array de string
        let choferes_arr_str = choferes.map(chof =>{
            return `id_chofer:${chof.id_chofer},Nombre:${chof.nombre},Apellido:${chof.apellido},DNI:${chof.dni},licencia:${chof.licencia},Edad:${chof.edad},`
        });
        let choferes_str=choferes_arr_str.join('\n');
        //Junto cada string del array choferes_arr_str en un unico str

        //El cajon de promesas sera retornado con un str contienendo el listado de filas de la tabla Choferes
        console.log(choferes_str);
        return choferes_str;

    }
    catch(error)
    {
        return (`${error}`);
    }

}

async function READ_nya_Chofer(nombre, apellido) {
    try {
        let choferes = await Choferes.findAll();
        
        choferes.forEach(chofer => {
            if(nombre === chofer.nombre && apellido === chofer.apellido) {
                let choferEncontrado = `id_chofer: ${chofer.id_chofer}, Nombre: ${chofer.nombre}, Apellido: ${chofer.apellido}, DNI:${chofer.dni}, licencia: ${chofer.licencia}, Edad: ${chofer.edad}\n`; 
            }
        });
        console.log(choferEncontrado);
        return choferEncontrado;
    } catch(error) {
        return (`${error}`);
    }
}


async function READ_ALL_Vehiculos() {
    try {
        let vehiculos = await Vehiculos.findAll();
        
        let vehiculos_str_arr = vehiculos.map(vehi => {
            return `id_vehiculo: ${vehi.id_vehiculo}, Patente: ${vehi.patente}, carga_util:${vehi.carga_util}, licencia_minima:${vehi.lic_minima}, en_uso:${vehi.en_uso},`
        });
        let vehiculos_str = vehiculos_str_arr.join('\n');
        console.log(vehiculos_str);
        return vehiculos_str;

    } catch(error) {
        return (`${error}`);
    }

}

async function READ_patente_Vehiculo(patente)
{   
    veh = await Vehiculos.findOne({ where: {patente:patente} });

    if(veh){
        return (`id_vehiculo: ${veh.id_vehiculo} patente:${veh.patente} licencia_minima:${veh.licencia_minima} en_uso:${veh.en_uso} `);
    }else{
        return("NO EXISTE VEHICULO");
    }
}

async function UPDATE_Chofer(dni,nuevo_nombre,nuevo_apellido,nueva_edad)
{
    chofupd = await Choferes.update( 
        {nombre:nuevo_nombre,apellido:nuevo_apellido,edad:nueva_edad}, 
        {where: {dni:dni} });

    if(chofupd){
        return ("DATOS ACTUALIZADOS");
    }else{
        return("NO FUE POSIBLE ACTUALIZAR");
    }

}

async function UPDATE_Vehiculo()
{
    
}

async function DELETE_Chofer(nombre)
{
    return(await Choferes.destroy({ where: {nombre:nombre} }));
}

async function DELETE_Vehiculo(nombre)
{
    return(await Vehiculos.destroy({ where: {nombre:nombre}}));
}
async function DELETE_ALL_Choferes()
{
    return(await Vehiculos.destroy({ where: {}, truncate: true }));
}

async function DELETE_ALL_Vehiculos()
{
    
}


async function procesar_solicitudes(arg)
{
    let rta_a_cliente="";
    if(arg.length>1)
{
    //console.log("procesando solicitud");
    for (let i = 0; i < arg.length; i++) 
    {
    console.log(`argumento${i} : valor ${arg[i]}`);
    }


    if(arg[2]==="CREATE")
    {
        //uso: CREATE CHOFER id nombre apellido dni licencia edad
        //uso: CREATE VEHICULO id patente carga_util lic_minima en_uso
        if(arg[3]==="CHOFER")
        {
            //Le mando derecho sin verificar nada, OJO
            rta_a_cliente=CREATE_CHOFER(parseInt(arg[4],10),arg[5],arg[6],arg[7],arg[8],arg[9]);
            //rta_a_cliente="CHOFER Creado";
            
        }
        if(arg[3]==="VEHICULO")
        {
            //Tarea
        }
        if(arg[3]==="HABILITACION")
            {
                rta_a_cliente=CREATE_HABILITACION(arg[4],arg[5]);
            }
    
        
        return(rta_a_cliente);

    }else if(arg[2]==="READ")
    {
        rta_a_cliente="ERROR LECTURA";
        //READ
        //console.log(`Aca tenes que codear el  ${arg[2]}`);

        if(arg[3]==="ALL")
        {
            if(arg[4]==="CHOFERES")
            {
                try{

                    return(READ_ALL_Choferes());
           
                }
                catch(error)
                {
                    return (`${error}`);
                }
            }
            if(arg[4]==="VEHICULOS")
            {
                //Completar Tarea
            }

            return(rta_a_cliente);
        }else if(arg[3]==="PATENTE")
        {
            //console.log(READ_patente_Vehiculo(arg[4]));

            return(READ_patente_Vehiculo(arg[4]) ); 

        }




    }else if(arg[2]==="UPDATE")
    {
        //UPDATE CHOFER dni nuevo_nombre nuevo_apellido nueva_edad
        if(arg[3]==="CHOFER")
        {
            return(UPDATE_Chofer(arg[4],arg[5],arg[6],arg[7]) );
        }
        if(arg[3]==="VEHICULO")
        {
        //Tarea
        }
        
        
    }else if(arg[2]==="DELETE")
    {
        rta_a_cliente="Fallo al intentar DELETE\n";
        //DELETE CHOFER nombre
        //DELETE Vehiculo patente
        if(arg[3]==="CHOFER")
        {
            //Le paso  argumento 4 sin verificar debe ser nombre de chofer existente
            if(DELETE_Chofer(arg[4]))
            {
                rta_a_cliente=`${arg[4]} fue borrado con exito`;
            }
            
        }
        if(arg[3]==="VEHICULO")
        {
            //Tarea hacer
        }


        return(rta_a_cliente);
    }
}
}

let server = net.createServer((socket)=>{
    socket.write("Bienvenido al Serividor echo\n");

    //evento data, se reciben datos desde el otro lado
    
    socket.on('data',async function(data)
    {

        let data_str=data.toString();
        let arg=data_str.split(" ");
        arg[arg.length-1]=(arg[arg.length-1]).trim();//Al ultimo elemento le saco el enter //trim quita no letras y num
        let arg_ajustado=["compensa el ejecutable de node","compensa el nombre del programa"];
        
        arg_ajustado = arg_ajustado.concat(arg);

        let retorno=await procesar_solicitudes(arg_ajustado);
        //le meti async y await para esperar la solicitud aca
        //Asi aguardo a que finalize la promesa que corresponda de la BBDD, que se esta realizando dentro
        //de procesar_solicitudes()
        if(retorno)
        {
            socket.write(retorno+"\n");
        }
        
        //Envio al cliente lo retornado por la funcion

    });

});


server.listen(port);

console.log("Servidor echo corriendo en "+port);
