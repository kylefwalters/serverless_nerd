const http = require('http');
const url = require('url');
const winston = require('winston');
const {format} = require('winston');
const fs = require('fs');
const { GroceryItem } = require('./GroceryItem');

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
    });

    // Get grocery list from .json
    let groceryList;
    const fileName = 'groceries.json';
    if(fs.existsSync(fileName)) {
        groceryList = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        // convert each item in array to GroceryItem
        for(i = 0; i < groceryList.length; i++) {
            groceryList[i] = Object.assign(new GroceryItem(), groceryList[i]);
        }
    } else {
        groceryList = [new GroceryItem("Test", 1, 123)];
        const data = new Uint8Array(Buffer.from(JSON.stringify(groceryList)));
        fs.writeFileSync(fileName, data);
    }

    switch(req.method){
        case 'GET':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(groceryList));
            res.end();
            break;
        case 'POST':
            req.on('end', () => {
                const newGrocery = Object.assign(new GroceryItem(), JSON.parse(body));
                groceryList.push(newGrocery);
                updateGroceryJSON(groceryList, fileName);
                showGroceryList(groceryList);
        
                res.writeHead(201, { 'Content-Type': 'text/plain' });
                res.write(JSON.stringify(groceryList));
                res.end();
            });
            break;
        case 'PUT':
            {
                const queryObject = url.parse(req.url, true).query;
                const index = queryObject.index;

                req.on('end', () => {
                    const newGroceryStatus = JSON.parse(body);
                    groceryList[index].bought = newGroceryStatus.bought;
                    updateGroceryJSON(groceryList, fileName);
                    showGroceryList(groceryList);
                    
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write(JSON.stringify(groceryList[index]));
                    res.end();
                });
            }
            break;
        case 'DELETE':
            {
                const queryObject = url.parse(req.url, true).query;
                const index = queryObject.index;

                req.on('end', () => {
                    const deletedItem = groceryList[index];
                    groceryList.splice(index, 1);
                    updateGroceryJSON(groceryList, fileName);
                    showGroceryList(groceryList);
                    
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.write(JSON.stringify(deletedItem));
                    res.end();
                });
            }
            break;
        default:
            break;
    }
}

function showGroceryList(groceryList) {
    console.log("______________________________________________________________");
    for(i = 0; i < groceryList.length; i++) {
        console.log((i + 1) + ". " + groceryList[i].toString());
    }
    console.log("______________________________________________________________");
}

function updateGroceryJSON(groceryList, fileName) {
    const data = new Uint8Array(Buffer.from(JSON.stringify(groceryList)));
    fs.writeFileSync(fileName, data);
}