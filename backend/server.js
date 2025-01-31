import app from './src/app.js'
import http from 'http'
import config from './src/config/config.js';
import connect from './src/db/db.js';
connect();

const server = http.createServer(app);

server.listen(config.PORT,()=>{
    console.log("server is running");
})