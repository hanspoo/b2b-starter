# b2b-starter

Working skeleton of multi ornanizacion project with a relational database, ideal for a b2b. Modern technological stack.
For simplicity we have not used more elaborate frameworks such as nextjs or nestjs, only React and Express.

We have prepared a video to help you install:

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

- User registration token based
- User explorer
- Password recovery with email

Note: No links in emails

## Because ?

This project was born in the development of a logistics system that evolved into multi-company, multi-user, the type used to develop software as a service.

We incorporate a good login, registration and password recovery process with good practices such as not sending links in emails and using tokens and not cookies. Therefore, we think it is a good contribution to the community to have a prototype project with which to begin development.

There may be some vestigial things left from the original pallet system hanging around. We apologize. If this is the case, let us know so we can remove them or send us an MR.

The main React app and the database are called starter, in the sense that it will help them make their projects very quickly.

Finally: Apologies for the Spanglish, we are doing a global refactor to leave everything in Spanish.

## Requirements

This is a node project, therefore the first thing is to install node, there are several
ways to do it; We recommend using nvm, and for the moment use 18.

do not give

```
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-22-04
```

or if we use nvm:

```
nvm install 18
nvm alias default 18
```

postgresql

```
sudo apt install postgresql
```

nx

It makes it quite simple to have nx installed globally, it may be that by the time you are installing, 16 is installed by default, so
At the moment it is necessary to use latest to install nx 16.

```
npm i -g nx@latest
```

## Development

```
git clone https://github.com/hanspoo/b2b-starter
cd b2b-starter/
npm install
npm run test
```

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

Currently, in order to use Gmail, you must first enable the
two-step authentication, and then create an app in section:

App passwords

## Database

The system will use the DB\* environment variables to connect to the database.
Only in test we use sqlite, in the other environments we use postgresql. You can create any
forms the database, we have this script to quickly create the database and credentials:

```
sudo su postgres -s bin/create-db-as-postgres.sh b2b
```

This will create a database called b2b, with a user called b2b with
password 123456.

Then configure the .env file with this data.

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

##Custom database

Create .env.local file in the root of the project with the variables, for example:

```
DB_NAME=gargoyle
DB_USER=gargoyle
DB_PASS=stone
```

The bin/pg-create.sh script does this same thing.
