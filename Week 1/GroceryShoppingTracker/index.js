const http = require('http');
const url = require('url');
const { GroceryItem } = require('./GroceryItem');

setUpServer();

const groceryList = [new GroceryItem("Test", 1, 21)];

function setUpServer() {
    // TODO: read & write grocery list to groceries.json
    const server = http.createServer( (req, res) => {
        handleRequests(req, res);
    });

    const port = '3000';
    server.listen(port, () => {
        const address = server.address();
        console.log(`Server opened on localhost:${address.port}`);
    });
}

function handleRequests(req, res) {
    console.log(`Received ${req.method} request`);
    // Parse body
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

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
                showGroceryList();

                res.writeHead(201, {'Content-Type': 'text/plain'});
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
                    showGroceryList();
                    
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
                    showGroceryList();
                    
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

function showGroceryList() {
    console.log("______________________________________________________________");
    for(i = 0; i < groceryList.length; i++) {
        console.log((i + 1) + ". " + groceryList[i].toString());
    }
    console.log("______________________________________________________________");
}