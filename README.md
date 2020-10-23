# bot de discord: MisionTic

Este es un bot de discord para el server de el programa educativo Mision TIC 2022
puede ser personalizado para usar sus funcionalidades en otros servers (entrar a el codigo y cambiar las variables indicadas allí).
el bot maneja funcionalidades simples en el server:

* Sistemas de niveles.
* Sistema de advertencias y baneos.

### Setup de el bot

- crear nuevo bot en la pagina oficial de discord y copiar el token.
- clonar repositorio
- en la carpeta base añadir archivo config.json con la siguiente informacion:
```
{
  "prefix":"(aqui va el prefix a utilizar para los comandos del bot)",
  "token":"(aqui va el token del bot)"
}
```
-ejecutar el archivo bot.js con el comando:
```node .\bot.js```

Si en consola puede ver un mensaje que dice: Sesión iniciada como...  ** significa que el bot ya esta listo y funcionando **

### Documentacion para uso:

* !!nivel - en cualquier canal, el bot respondera con un mensaje en el que se muestra el nivel actual del usuario, su xp y la xp para llegar al siguiente nivel.
* !!warn @usuario razon de warneo - pone advertencia e el usuario mencionado, envia mensaje informando de la advertencia, cuando un usuario llega a las 3 advertencias este es baneado

