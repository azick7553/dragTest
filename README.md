NAVIGATION-API

Prerequisites:

Before you begin, ensure you have installed the latest version of:

npm, PostgreSQL, Node, Express, pg-promise, nodemon


Install the Express Generator:

$ npm install express-generator@4 -g

Install pg-promise:

$ npm install pg-promise@5 --save

Install nodemon:
npm install -g nodemon@1.18.5

API Reference:
example: http://localhost:3000/api/navigation/links

This web servise provides folowing endpoints:

GET '/api/navigation',
GET '/api/navigation/links',
GET '/api/links',
GET '/api/links/:id',
POST '/api/links',
PUT '/api/links/:id',
DELETE '/api/links/:id'

Start the server:

$ npm start or $ nodemon index.js

follow link: http://localhost:3000/

To Create database run:
$ psql -f navigation.sql