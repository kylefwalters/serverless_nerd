const fs = require('fs');
const { getGroceryList, postGroceryList, putGroceryList, deleteGroceryList, fileName} 
    = require('../GroceryListOperations');
const { GroceryItem } = require('../GroceryItem');

jest.mock('fs');

describe('Test Endpoint Handling', () => {

    beforeEach(() => {
        const mockGroceryList = [new GroceryItem("Test", 1, 123)];
        fs.readFileSync.mockReturnValue(JSON.stringify(mockGroceryList));
        fs.existsSync.mockReturnValue(true);
    })

    afterEach(()=> {
        fs.readFileSync.mockClear();
        fs.writeFileSync.mockClear();
    })
    
    test('Calling GET endpoint should return current grocery list', () => {
        const mockGroceryList = [new GroceryItem("Test", 1, 123)];
        const result = getGroceryList();

        expect(result).toStrictEqual(mockGroceryList);
        expect(fs.readFileSync).toHaveBeenCalledTimes(1);
        expect(fs.readFileSync).toHaveBeenCalledWith(fileName, 'utf8');
    })

    test('Calling POST should return an updated list', () => {
        const mockGroceryList = [new GroceryItem("Test", 1, 123)];
        const mockGroceryItem = new GroceryItem("Orange", 3, 18);
        mockGroceryList.push(mockGroceryItem);
        const data = new Uint8Array(Buffer.from(JSON.stringify(mockGroceryList)));

        const result = postGroceryList(JSON.stringify(mockGroceryItem));
        
        expect(result).toStrictEqual(mockGroceryList);
        expect(fs.readFileSync).toHaveBeenCalledTimes(1);
        expect(fs.readFileSync).toHaveBeenCalledWith(fileName, 'utf8');
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
        expect(fs.writeFileSync).toHaveBeenCalledWith(fileName, data);
    })

    test('Calling PUT should return the updated item', () => {
        const updatedItemStatus = true;
        const queryparams = '/?index=0';
        const mockGroceryItem = new GroceryItem("Test", 1, 123, updatedItemStatus);
        const mockGroceryList = [mockGroceryItem];
        const data = new Uint8Array(Buffer.from(JSON.stringify(mockGroceryList)));

        const result = putGroceryList(queryparams, JSON.stringify({bought: true}));

        expect(result).toStrictEqual(mockGroceryItem);
        expect(fs.readFileSync).toHaveBeenCalledTimes(1);
        expect(fs.readFileSync).toHaveBeenCalledWith(fileName, 'utf8');
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
        expect(fs.writeFileSync).toHaveBeenCalledWith(fileName, data);
    })

    test('Calling DELETE should return updated list without item', () => {
        const queryparams = '/?index=0';
        const mockGroceryList = [];
        const data = new Uint8Array(Buffer.from(JSON.stringify(mockGroceryList)));

        const result = deleteGroceryList(queryparams);
        
        expect(result).toStrictEqual(mockGroceryList);
        expect(fs.readFileSync).toHaveBeenCalledTimes(1);
        expect(fs.readFileSync).toHaveBeenCalledWith(fileName, 'utf8');
        expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
        expect(fs.writeFileSync).toHaveBeenCalledWith(fileName, data);
    })
});