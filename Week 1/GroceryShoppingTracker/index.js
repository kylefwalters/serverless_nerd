const { GroceryItem } = require('./GroceryItem');
const readline = require('readline');

let userName;
const groceryList = [];

const rl = readline.createInterface({
  input: process.stdin, // Read from standard input (keyboard)
  output: process.stdout // Write to standard output (console)
});

rl.question('Enter name: ', (name) => {
    userName = name;
	console.log(`Welcome, ${userName}`);
    console.log("Enter the details of the first item to add to your list");
    askForItemName();
});

rl.on('line', (line) => {
    console.log(line);
});

rl.once('close', () => {
    // end of input
    console.log(`Goodbye, ${userName}`);
});

function askToModifyList() {
    rl.question("What would you like to do? (add/remove/modify)", (response) => {
        response = response.toLowerCase();
        switch(response) {
            case "add":
                askForItemName();
                break;
            case "remove":
                removeItem();
                break;
            case "modify":
                modifyItem();
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
    rl.question("(2/3) How many of the item do you want? ", (price) => {
        groceryItem.price = price;
        askForItemPrice(groceryItem);
    });
}

function askForItemPrice(groceryItem) {
    rl.question("(3/3) What is the price of the item? $", (quantity) => {
        groceryItem.quantity = quantity;
        groceryList.push(groceryItem);

        console.log("Great, item added");
        showGroceryList();
        askToModifyList();
    });
}

function removeItem() {
    
}

function modifyItem() {

}

function showGroceryList() {
    console.log("______________________________________________");
    for(i = 0; i < groceryList.length; i++) {
        console.log(i + ". " + groceryList[i].toString());
    }
    console.log("______________________________________________");
}