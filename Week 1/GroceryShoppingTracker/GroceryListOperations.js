const fs = require('fs');
const url = require('url');
const {GroceryItem} = require('./GroceryItem');

// static vars
const fileName = 'groceries.json';

function getGroceryList(res) {
    const groceryList = readGroceryList();

    if(res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
            .end(JSON.stringify(groceryList));
    }
    return groceryList;
}

function postGroceryList(body, res) {
    const groceryList = readGroceryList();
    const newGrocery = Object.assign(new GroceryItem(), JSON.parse(body));

    if(newGrocery) {
        groceryList.push(newGrocery);
        writeGroceryList(groceryList, fileName);
        showGroceryList(groceryList);

        res?.writeHead(201, { 'Content-Type': 'text/plain' });
    }else {
        res?.writeHead(400, { 'Content-Type': 'text/plain' });
    }

    if(res) {
        res.write(JSON.stringify(groceryList));
        res.end();
    }
}

function putGroceryList(req, body, res) {
    const queryObject = url.parse(req.url, true).query;
    const index = queryObject.index;
    const groceryList = readGroceryList();
    const newGroceryStatus = JSON.parse(body);

    groceryList[index].bought = newGroceryStatus.bought;
    writeGroceryList(groceryList, fileName);
    showGroceryList(groceryList);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(JSON.stringify(groceryList[index]));
    res.end();
}

function deleteGroceryList(req, res) {
    const queryObject = url.parse(req.url, true).query;
    const index = queryObject.index;
    const groceryList = readGroceryList();
    const deletedItem = groceryList[index];

    groceryList.splice(index, 1);
    writeGroceryList(groceryList, fileName);
    showGroceryList(groceryList);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(JSON.stringify(deletedItem));
    res.end();
}

function showGroceryList(groceryList) {
    console.log("______________________________________________________________");
    for(i = 0; i < groceryList.length; i++) {
        console.log((i + 1) + ". " + groceryList[i].toString());
    }
    console.log("______________________________________________________________");
}

function readGroceryList() {
    let groceryList;
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

    return groceryList;
}

function writeGroceryList(groceryList, fileName) {
    const data = new Uint8Array(Buffer.from(JSON.stringify(groceryList)));
    fs.writeFileSync(fileName, data);
}

module.exports = 
{getGroceryList, postGroceryList, putGroceryList, deleteGroceryList, fileName};