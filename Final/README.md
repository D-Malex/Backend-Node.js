# FINAL

## Español
Como version final de la API, implementa seguridad por medio de autenticacion con `JWT`, mas todas las tecnologias ya vistas.
### Para ejecutar localmente
+ Cree un archivo vacío llamado `.database.sqlite3` en la raíz del proyecto para contener la base de datos `SQLite`
+ Asegúrese de tener `sequelize-cli instalado` y ejecute `npx sequelize db:migrate` para configurar la tabla de usuarios en `database.sqlite3`
+ La conexión a la base de datos se maneja en `models/index.js` como parte del texto estándar de `sequelize`
+ Cree un archivo `.env` en la raíz del proyecto con un valor `TOKEN_SECRET` para definir la clave secreta utilizada para firmar el token
+ Ejecute `npm start` para iniciar el servidor en `localhost:3000`
+ 
Puede utilizar "Postman" para enviar solicitudes a los siguientes puntos finales:
+ POST - `/api/user/register` con `{nombre de usuario, correo electrónico, contraseña}` en el cuerpo de la solicitud
+ POST - `/api/user/login` con `{email, contraseña}` como cuerpo de la solicitud
+ GET - `/api/protected` al que solo podrás acceder si inicias sesión correctamente

Basado en [este] vídeo tutorial (https://www.youtube.com/watch?v=2jqok-WgelI)


## English
As the final version of the API, it implements security through authentication with `JWT`, plus all the technologies already seen.
### To run locally
+ Create an empty file called `.database.sqlite3` in the project root to hold the `SQLite` database
+ Make sure you have `sequelize-cli installed`, and run `npx sequelize db:migrate` to set up the user table in `database.sqlite3`
+ Database connection is handled in `models/index.js` as part of the `sequelize` boilerplate
+ Create a `.env` file in the project root with a `TOKEN_SECRET` value to define the secret key used to sign the token
+ Run `npm start` to start server on `localhost:3000`
+ 
You can use `Postman` to send requests to the following endpoints:
+ POST - `/api/user/register` with `{username, email, password}` in the request body
+ POST - `/api/user/login` with `{email, password}` as the request body
+ GET  - `/api/protected` which you will only be able to access if successfully logged in

Based on [this](https://www.youtube.com/watch?v=2jqok-WgelI) video tutorial
