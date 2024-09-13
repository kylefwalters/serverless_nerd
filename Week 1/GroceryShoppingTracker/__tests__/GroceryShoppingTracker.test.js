const fs = require('fs');
const { getGroceryList, postGroceryList, putGroceryList, deleteGroceryList, fileName} 
    = require('../GroceryListOperations');
const { GroceryItem } = require('../GroceryItem');

jest.mock('fs');

describe('Test Endpoint Handling', () => {
    const mockGroceryList = [new GroceryItem("Test", 1, 123)];
    const mockGroceryItem = new GroceryItem("Orange", 3, 18);
    
    beforeAll(() => {
        fs.readFileSync.mockReturnValue(JSON.stringify(mockGroceryList));
    });

    beforeEach(() => {
        fs.readFileSync.mockClear();
        fs.writeFileSync.mockClear();
    })
    
    test('Calling GET endpoint should return current grocery list', () => {
        fs.existsSync.mockReturnValue(true);
        
        const result = getGroceryList();

        expect(result).toStrictEqual(mockGroceryList);
        expect(fs.readFileSync).toHaveBeenCalledTimes(1);
        expect(fs.readFileSync).toHaveBeenCalledWith(fileName, 'utf8');
    })
});