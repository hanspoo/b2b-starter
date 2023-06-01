# b2b-starter

Prototipo operativo de proyecto multi empresas con bases de datos, ideal para un b2b. Moderno stack tecnológico.
Por simplicidad no hemos usado frameworks más elaborados como nextjs ni nestjs, sólo React y Express.

Vide de ayuda para instalar en youtube:

[https://www.youtube.com/watch?v=H3FVW_YogM8]

## Stack

- nx
- react
- express
- postgresql - dev/prod
- sqlite - test
- typescript
- typeorm
- antd
- jest
- storybook

## Apps básicas

- Login
- Registro de empresas y usuarios
- Recuperación de contraseñas

Nota: Sin links en los correos

## Porque ?

Este proyecto nace en el desarrollo de un sistema de logística que evolucionó en multiempresas, multi usuarios, del tipo que se utiliza para desarrollar software como servicio.

Incorporamos un buen proceso de login, registro y recuperación de contraseñas con buenas prácticas como por ejemplo no mandar enlaces en los correos y usar tokens y no cookies. Por lo tanto nos parece un buen aporte a la comunidad el disponer de un proyecto prototipico con el cual comenzar un desarrollo.

Puede que queden algunas cosas vestigiales del sistema original de pallets por ahí danto vueltas Les pedimos disculpas si es el caso nos avisan para irlas removiendo o nos mandan un MR.

Al app principal React, y la base de datos llevan el nombre starter, en el sentido de que les va ayudar hacer muy rápido sus proyectos.

Finalmente: Disculpas por el spanglish, estamos realizando un refactor global para dejar todo en español.

## Requisitos

node

```
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04
```

postgresql

```
sudo apt install postgresql
```

nx

```
sudo npm i -g nx
```

## Desarrollo

```
git clone https://github.com/hanspoo/b2b-starter
cd b2b-starter/
npm install
npm run test
```

Crear archivo .env.local en raiz del proyecto:

```
VITE_SERVER_URL=http://localhost:3333
VITE_PORT=3333
VITE_UPLOAD_FOLDER=/home/username/uploads

VITE_SMTP_USER=user@gmail.com
VITE_SMTP_PASS=xxxxxxxxx
; VITE_SMTP_SERVER=smtp.gmail.com
; VITE_SMTP_PORT=587

VITE_DB_NAME=b2b
VITE_DB_USER=b2b
VITE_DB_PASS=123456
```

## Base de datos

El sistema utilizará las variables de entorno VITE_DB\* para la conexión a la base de datos.
Sólo en test usamos sqlite, en los otros ambientes usamos postgresql. Puede crear de cualquier
forma la base de datos, tenemos este script para poder crear rápidamente la base de datos y credenciales:

```
sudo su postgres -s bin/create-db-as-postgres.sh b2b
```

Esto va a crear una base e datos llamada b2b, con un usario llamado b2b con
contraseña 123456.

Luego configurar con estos datos el archivo .env.

## Ejecutar backend

```
nx serve api
```

## Ejecutar front en otro terminal

```
nx serve front
```

Ir a al navegador:
http://localhost:4200

Ahora se puede logear con el:
usuario:
admin@starter.com
password:
123456

## Producción

```
npm run build
cd dist/apps/api
node main.js
```

## Custom database

Crear archivo .env.local en la raíz del proyecto con las variables, por ejemplo:

```
VITE_DB_NAME=gargola
VITE_DB_USER=gargola
VITE_DB_PASS=depiedra
```

El script bin/pg-create.sh hace esto mismo.
