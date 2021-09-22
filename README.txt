1- El acceso de la aplicación es restringido, si no se ha iniciado sesión no deja entrar. 
2- Hay dos usuarios por defecto; admin@admin.com - admin123, email@email.com - 123abC
3- Captura con los errores que muestra el login. Se pueden dar dos casos; si falta algún campo por rellenar se le pedirá que los rellene todos. 
En caso de que el usuario no exista se muestra el mensaje de usuario no registrado.
4- Captura con errores de registro. En el caso del registro hay un mensaje personalizado para cada campo requerido.
Al lado del campo requerido hay una imagen de información, que al mantener el ratón encima se proporcionará información
de los requerimentos del campo. Al dejar de apuntar con el ratón, la información se oculta.
5-Una vez regitrado/a o iniciado sesión, se accede a la pantalla principal de la aplicación. 
6- En la página principal aparece un listado de cervezas por defecto. Si se pasa el ratón por encima del nombre del usuario, 
aparecerá un cuadrado con la predictora información del usuario. El botón de cerrar ocultará dicho cuadrado. 
7- Las cervezas se pueden filtrar con los criterios que aparecen en una barra de navegación donde hay un botón de aleatorio, 
este lo que hará será obtener una cerveza de forma aleatoria. 
8- Todas las cervezas se pueden guardar con el botón de añadir en los detalles de la cerveza, una vez guardada la cerveza
se deshabilita el botón de añadir. 
9- En la barra de navegación principal, tenemos las cervezas añadidas a favoritos pulsando el icono del corazón. 
Ahí se mostraran todas las cervezas que el usuario ha añadido a favoritos. En caso de no tener ninguna aparecerá un panel de aviso. 
Las cervezas añadidas a favoritos tienen, repectivamente un botón para eliminar esa cerveza de la lista de favoritos. 
10- Al pulsar el botón de cerrar sesión, se redigirá a la pantalla de login sin poder volver acceder a la pantalla principal de 
la aplicación hasta que se vuelva a iniciar sesión o completar un registro. Esto es debido a que al pulsar cerrar sesión
se invoca a una función que borra la variable de sesión actual. 