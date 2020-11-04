# bot de discord: MisionTic

## Creado Por: Esteban Navia y Juan José Zuluaga Patiño

Este es un bot de discord para el server de el programa educativo Mision TIC 2022
puede ser personalizado para usar sus funcionalidades en otros servers (entrar a el codigo y cambiar las variables indicadas allí).
el bot maneja funcionalidades simples en el server:

-   Sistemas de niveles.
-   Sistema de advertencias y baneos.
-   Sistema de informacion
-   Sistema de tickets (desarrollo)

### Setup de el bot

-   crear nuevo bot en la pagina oficial de discord y copiar el token.
-   clonar repositorio
-   reemplazar el archivo .env.dist por un archivo .env con la misma informacion, poner el token de el bot en la variable TOKEN y cambiar el prefix en la variable PREFIX

````
-ejecutar los comandos:
```npm i```
```npm start```

Si en consola puede ver un mensaje que dice: Sesión iniciada como...  **significa que el bot ya esta listo y funcionando**

### Uso:
##### (prefix+comando ej. !!nivel)

###### Solo para admins
  * **nivel** - se muestra el nivel actual del usuario, su xp y la xp para llegar al siguiente nivel.
  * **warn @nombre_usuario razon_de_warneo** - advierte a el usuario mencionado, cuando un usuario llega a las 3 advertencias este es baneado
  * **ruta1**

###### Para cualquiera
  * **ayuda** - se muestra informacion de contacto de el programa educativo
  * **ruta1** - muestra informacion especifica de la ruta 1
````
