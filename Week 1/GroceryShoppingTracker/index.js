const http = require('http');
const winston = require('winston');
const {format} = require('winston');
const {getGroceryList, postGroceryList, putGroceryList, deleteGroceryList} 
= require('./GroceryListOperations');

// Create logger instance
const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(), 
        format.printf(({timestamp, level, message}) => {return `${timestamp} [${level}]: ${message}`})
    ),
    transports: [new winston.transports.Console(), new winston.transports.File({filename: 'app.log'})]
});

setUpServer();

function setUpServer() {
    const server = http.createServer( (req, res) => {
        handleRequests(req, res);
    });

    const port = '3000';
    server.listen(port, () => {
        const address = server.address();
        logger.log('info', `Server opened on localhost:${address.port}`);
    });
}

function handleRequests(req, res) {
    logger.log('info', `Received ${req.method} request`);
    // Parse body
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
        console.log(body);
    }).on('end', () => {
        switch(req.method){
            case 'GET':
                getGroceryList(res);
                break;
            case 'POST':
                postGroceryList(body, res);
                break;
            case 'PUT':
                putGroceryList(req, body, res);
                break;
            case 'DELETE':
                deleteGroceryList(req, res);
                break;
            default:
                break;
        }
    });
}