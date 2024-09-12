const {getArgsFromCLI} = require("./GetArgsFromCLI");

// getArgsFromCLI(ArrayChunker);
arrayChunker([[1,2,3,4,5], 6]);

function arrayChunker(args) {
    const numbers = args[0];
    const chunkSize = args[1];

    const chunkedArrays = [];
    while(numbers.length > 0) {
        const newArray = numbers.splice(0, chunkSize);
        chunkedArrays.push(newArray);
    }
    console.log(chunkedArrays);
    return chunkedArrays;
}