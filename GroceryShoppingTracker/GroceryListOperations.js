const url = require('url');
const uuid = require('uuid');
const { unmarshall } = require('@aws-sdk/util-dynamodb');
const { GroceryItem } = require('./GroceryItem');
const GroceryDAO = require('./GroceryDAO');

async function getGroceryList(res) {
    const groceryList = await readGroceryList();

    if (res) {
        res.writeHead(200, { 'Content-Type': 'text/plain' })
            .end(JSON.stringify(groceryList));
    }
    return groceryList;
}

async function postGroceryList(body, res) {
    const groceryList = await readGroceryList();
    let newGrocery = Object.assign(new GroceryItem(), JSON.parse(body));

    if (newGrocery) {
        newGrocery = writeGroceryList(newGrocery.name, newGrocery.price, newGrocery.bought);
        groceryList.push(newGrocery);
        showGroceryList(groceryList);

        res?.writeHead(201, { 'Content-Type': 'text/plain' });
    } else {
        res?.writeHead(400, { 'Content-Type': 'text/plain' });
    }

    res?.end(JSON.stringify(groceryList));
    return groceryList;
}

async function putGroceryList(queryParams, body, res) {
    const queryObject = url.parse(queryParams, true).query;
    const index = queryObject.index;
    const groceryList = await readGroceryList();
    const newGroceryStatus = JSON.parse(body);
    const key = {ItemID: groceryList[index].itemID};

    console.log(newGroceryStatus.purchased);
    updateGroceryList(key, newGroceryStatus.purchased);
    groceryList[index].purchased = newGroceryStatus.purchased;
    showGroceryList(groceryList);

    res?.writeHead(200, { 'Content-Type': 'text/plain' });
    res?.write(JSON.stringify(groceryList[index]));
    res?.end();

    return groceryList[index];
}

async function deleteGroceryList(queryParams, res) {
    const queryObject = url.parse(queryParams, true).query;
    const index = queryObject.index;
    const groceryList = await readGroceryList();
    const deletedItem = groceryList[index];
    const key = {ItemID: deletedItem.itemID};

    deleteFromGroceryList(key);
    groceryList.splice(index, 1);
    showGroceryList(groceryList);

    res?.writeHead(200, { 'Content-Type': 'text/plain' });
    res?.write(JSON.stringify(deletedItem));
    res?.end();

    return groceryList;
}

function showGroceryList(groceryList) {
    console.log("______________________________________________________________");
    for (i = 0; i < groceryList.length; i++) {
        console.log((i + 1) + ". " + groceryList[i].toString());
    }
    console.log("______________________________________________________________");
}

async function readGroceryList() {
    let groceryList = [];

    const returnedList = await GroceryDAO.getList();
    for (item of returnedList) {
        const unmarshalledItem = unmarshall(item);
        groceryList.push(new GroceryItem(unmarshalledItem.ItemID, unmarshalledItem.Name, unmarshalledItem.Price, unmarshalledItem.Purchased));
    }

    return groceryList;
}

function writeGroceryList(Name, Price, Purchased) {
    const ItemID = uuid.v4();
    const item = { ItemID, Name, Price, Purchased };
    GroceryDAO.createItem(item);
    return item;
}

function updateGroceryList(Key, Purchased) {
    GroceryDAO.updateItem(Key, Purchased);
}

function deleteFromGroceryList(Key) {
    GroceryDAO.deleteItem(Key);
}

module.exports =
    { getGroceryList, postGroceryList, putGroceryList, deleteGroceryList };