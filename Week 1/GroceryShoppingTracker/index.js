const http = require('http');
const url = require('url');
const { GroceryItem } = require('./GroceryItem');

setUpServer();

const groceryList = [new GroceryItem("Test", 1, 21)];

function setUpServer() {
    const server = http.createServer((req, res) => {
        // TODO: read & write grocery list to groceries.json
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
        handleRequest(req, res);
    })

    const port = '3000';
    server.listen(port, () => {
        const address = server.address();
        console.log(`Server opened on localhost:${address.port}`);
    });
}

function handleRequest(req, res) {
}

function getGroceryList(res) {
}

function askToModifyList() {
    rl.question("What would you like to do? (add/remove/bought/list)", (response) => {
        response = response.toLowerCase();
        switch(response) {
            case "add":
                askForItemName();
                break;
            case "remove":
                removeItem();
                break;
            case "bought":
                modifyItem();
                break;
            case "list":
                showGroceryList();
                askToModifyList();
                break;
            default:
                console.log("Invalid input, try again");
                askToModifyList();
                break;
        }
    });
}

function askForItemName() {
    rl.question("(1/3) What is the name of the item? ", (name) => {
        const groceryItem = new GroceryItem(name);

        askForItemQuantity(groceryItem);
    });
}

function askForItemQuantity(groceryItem) {
    rl.question("(2/3) How many of the item do you want? ", (quantity) => {
        if(isNaN(quantity)) {
            console.log("Invalid input, try again");
            askForItemQuantity(groceryItem);
        }else {
            groceryItem.quantity = quantity;
            askForItemPrice(groceryItem);
        }
    });
}

function askForItemPrice(groceryItem) {
    rl.question("(3/3) What is the price of the item? $", (price) => {
        if(isNaN(price)) {
            console.log("Invalid input, try again");
            askForItemPrice(groceryItem);
        }else {
            groceryItem.price = price;
            groceryList.push(groceryItem);
            console.log("Great, item added");
    
            showGroceryList();
            askToModifyList();
        }
    });
}

function removeItem() {
    showGroceryList();
    rl.question("Type the index of the item you'd like to remove: ", (index) => {
        groceryList.splice(index - 1, 1);
        console.log("Item removed");
        
        askToModifyList();
    });
}

function modifyItem() {
    showGroceryList();
    rl.question("Type the index of the item you have bought: ", (index) => {
        if(index > 0 && index < groceryList.length) {
            groceryList[index - 1].bought = true;
            console.log("Item marked as bought");
        }else {
            console.log("Invalid index, returning to options");
        }
        
        askToModifyList();
    });
}

function showGroceryList() {
    console.log("______________________________________________________________");
    for(i = 0; i < groceryList.length; i++) {
        console.log((i + 1) + ". " + groceryList[i].toString());
    }
    console.log("______________________________________________________________");
}