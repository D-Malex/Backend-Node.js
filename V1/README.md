# Requirements for Class 4

## Español:

Para la entrega de esta semana te pido que al codigo explicado en clase le agregues:

1. La funcionalidad `CREATE <usuario_nombre> <usuario_apellido> <edad>`, que agregara una persona al array empleados.
   Al ejecutar el programa:

   ```apache
   node 4_Class.js CREATE Juan Lopez 33
   ```

   Se ingresara al array a esta persona verificando que no este desde antes.
2. La funcionalidad `UPDATE nombre <usuario_nombre_viejo> <usuario_nombre_nuev> <usuario_apellido_nuev> <edad_nuev>`
   Al ejecutar el programa:

   ```apache
   node 4_Class.js UPDATE nombre  Juan Joan Peres 34
   ```

   Se verificara la existencia de un usuario Juan y se actulizaran los datos de nombre, apellido y edad.
3. La funcionalidad `DELETE ALL` que borrara todos los elementos del array.
4. La funcionalidad `DELETE nya  <usuario_nombre> <usuario_apellido>`, que verificara que el usuario exista y lo borrara del array.
   Al ejecutar el programa:

   ```apache
   node 4_Class.js DELETE nya Juan Perez
   ```

   Se verificara la existencia del usuario y se lo borrara.
5. Al final del programa, se pide solo a modo de debug imprimir el contenido del array empleado.

## English:

For this week's delivery I ask you to add to the code explained in class:

1. The `CREATE <user_name> <user_last> <age>` functionality, which will add a person to the employees array.
   When running the program:

   ```apache
   node 4_Class.js CREATE Juan Lopez 33
   ```
   This person will be entered into the array, verifying that he or she is not there before.
2. The `UPDATE name <user_old_name> <user_new_name> <user_new_last> <new_age>` functionality
   When running the program:

   ```apache
   node 4_Class.js UPDATE name Juan Joan Peres 34
   ```
   The existence of a Juan user will be verified and the name, surname and age data will be updated.
3. The `DELETE ALL` functionality that will delete all elements of the array.
4. The `DELETE nya <user_name> <user_lastname>` functionality, which will verify that the user exists and delete it from the array.
   When running the program:

   ```apache
   node 4_Class.js DELETE nya Juan Perez
   ```
   The existence of the user will be verified and it will be deleted.
5. At the end of the program, it is requested only as a debug to print the contents of the array used.
