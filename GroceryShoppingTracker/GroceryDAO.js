const { DynamoDBClient, QueryCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand
} = require("@aws-sdk/lib-dynamodb")

const client = new DynamoDBClient({region: "us-east-2"});

const documentClient = DynamoDBDocumentClient.from(client);

const TableName = "Grocery_List";

// CREATE
async function createItem(Item){
    const command = new PutCommand({
        TableName,
        Item
    });
    return await runCommand(command);
}

// READ
async function getItem(Key){
    const command = new GetCommand({
        TableName,
        Key
    });
    return await runCommand(command);
}

async function getList() {
    const command = new ScanCommand({
        TableName
    });
    return (await runCommand(command)).Items;
}

// UPDATE
async function updateItem(Key, Purchased) {
    const command = new UpdateCommand({
        TableName,
        Key,
        ConditionExpression: 'attribute_exists(ItemID)',
        UpdateExpression: "set Purchased = :purchased",
        ExpressionAttributeValues: {":purchased": Purchased}
    });
    await runCommand(command);
}

// DELETE
async function deleteItem(Key) {
    const command = new DeleteCommand({
        TableName,
        Key
    });
    await runCommand(command);
}

async function runCommand(command) {
    try{
        const data = await documentClient.send(command);
        return data;
    }catch(err){
        console.error(err);
    }
}

module.exports = {
    createItem,
    getItem,
    getList,
    updateItem,
    deleteItem
}