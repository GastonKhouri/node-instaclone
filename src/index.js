require( 'dotenv' ).config();
const Server = require( './models/server' );

// Clear Console
console.clear();

// Create Server
const server = new Server();

// Listen server
server.listen();