# Node (Express) - MongoDB - Redis Boilerplate 2021

A boilerplate for node.js (express) based Restful APIs which uses MongoDB & Redis. 

Thanks to Dockerization, you will be able to set up your development environment in seconds and start building your api business logic without struggling with boring setup processes. All docker containers (for MongoDB and Redis) require authorization, they are secure and ready-to-use in production.

Node Api supports
    - MongoDB connection
    - Redis connection
    - Server Infrastructure
    - Logging with winston
    - API Versioning

# Getting Started
* `git clone https://github.com/CanerSezgin/node-express-boilerplate.git`
* `cd node-express-boilerplate`
* `rm -rf .git`
* `cp .env.example .env`
* `npm run docker:dev`

# Create Database in Docker Container
- `docker exec -it {container_id} mongo`
- `use admin`
- `db.auth("admin123", "example123")` "*mongo_admin_user*", "*mongo_admin_pass*" 
- `use {newDBName}`
- `db.createUser( { user: "newdb_user", pwd: "newdb_pass", roles:[ { role: "readWrite", db: "newDBName" } ] } );`

Don't forget to change `MONGO_DB_NAME, MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD` in your  ,.env` file

# Commands
* `docker:dev`: compose up containers & network, start server in development mode (automatically restarting the node application when file changes in the directory are detected)
* `docker:logs`: Shows only node-app service logs,
* `docker:down`: Kill the server, down all containers & network,
* `docker:dev-restart`: Kill the server, down all containers & network, compose up in development mode

# License
[MIT](LICENSE)