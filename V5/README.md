# Requierments for V5

## Español
Para esta version ya contamos con el ORM `Squelize` encargandoce de mapear las clases `JavaScript` en entidades de la Base de datos `SQLite`, tenemos un servidor web montado con `Express` que nos permite hacer consultas basicas e interactuar directamente con los registro de la base de datos.
En la terminal ejecutar los siguientes comando para instalar los modulos necesarios:
```
npm install sqlite3
npm install sequelize
npm install sequelize-cli
npm install express
npm init --yes
npx sequelize init
```
Luego revisar el `package.json` y el `config/config.json`

# English
For this version we already have the `Squelize` ORM in charge of mapping the `JavaScript` classes into entities of the `SQLite` Database, we have a web server set up with `Express` that allows us to make basic queries and interact directly with the database record.
In the terminal run the following command to install the necessary modules:
```
npm install sqlite3
npm install sequelize
npm install sequelize-cli
npm install express
npm init --yes
npx sequelize init
```
Then check the `package.json` and the `config/config.json`
