# b2b-starter

Working skeleton of a database based project with modern stack.

Just react and express: for simplicity we have not used more elaborate frameworks such as nextjs or nestjs.

We have prepared a video to help you to install:

https://www.youtube.com/watch?v=H3FVW_YogM8

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

## Basic apps

- Login
- Home Page
- User registration token based
- User explorer
- Password recovery with email

Note: No links in emails

## Why ?

Choose and assemble all the pieces to start your new rocket project is not an easy task, moreover today !!.

This project is a working piece of the curated list ot technologies mentioned abobe. You just clone and begin
to work with the features your client wants.

For free you have registration, login and password recovery process. Good practices such as not sending links in emails and using tokens and not cookies.

Finally: We have translated to English recently, so please forgive the spanglish somewhere. Please feed back on this or give us your merge request.

## Prerequisites

### node

This is a node project, therefore the first thing is to install node, there are several
ways to do it; We recommend using nvm, and for the moment use 18.

These are instructions for ubuntu linux:

```
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04
```

better with nvm:

If no nvm installed:

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`

then

```
nvm install 18
nvm alias default 18
```

### postgresql

```
sudo apt install postgresql
```

### nx

Have nx globally installed simplify things:

```
npm i -g nx@latest
```

At the time of this writing latest is 17.

## Configure development

### Clone the project and run tests

```
git clone https://github.com/hanspoo/b2b-starter
cd b2b-starter/
npm install
npm run test
```

### Install and configure database

Dev and prod uses postgresql.

Create a database with this script:

```
sudo su postgres -s bin/create-db-as-postgres.sh b2b
```

This will create a database called b2b, with a user called b2b with password 123456.

## .env

Create .env.local file at the root of the project:

```
VITE_SERVER_URL=http://localhost:3333
PORT=3333
UPLOAD_FOLDER=/home/username/uploads

SMTP_USER=user@gmail.com
SMTP_PASS=xxxxxxxxx
; SMTP_SERVER=smtp.gmail.com
; SMTP_PORT=587

DB_NAME=b2b
DB_USER=b2b
DB_PASS=123456
```

The SMTP\* variables are used by the registration and password recovery system.

Tip: If you want to use Gmail, first enable two-step authentication, and then create
an app in section "App passwords", then use the app password here.

## Run backend

```
nx serve api
```

## Run front in another terminal

```
nx serve front
```

Go to browser:
http://localhost:4200

Now you can log in with:

user:
admin@starter.com
password:
123456

## Production

```
npm run build
cd dist/apps/api
node main.js
```
