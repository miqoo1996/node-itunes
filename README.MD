Node.JS Itunes Search Engine
-----

1. npm install
2. npm run start

-------

There's used mongoDB as a database, you can find the configuration the configuration in the .env file.

Structure
-----------------

1. package.json - required packages for this APP 
2. app.js - main file
3. mongo.js - db connection file
4. .env - configurations file to keep all the global variables there, eg. db-name, APP name, etc
5. models/ - All the models to work with DB
6. models/iTunesData.js - iTunesData Model
7. views/ - Frontend EJS files | template folder
8. assets/ - client side JS files | Frontend styles and javascript files