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
    console.log(`\nGoodbye, ${userName}`);
});

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
        groceryItem.quantity = quantity;

        askForItemPrice(groceryItem);
    });
}

function askForItemPrice(groceryItem) {
    rl.question("(3/3) What is the price of the item? $", (price) => {
        groceryItem.price = price;
        groceryList.push(groceryItem);
        console.log("Great, item added");

        showGroceryList();
        askToModifyList();
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
        groceryList[index - 1].bought = true;
        console.log("Item marked as bought");
        
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