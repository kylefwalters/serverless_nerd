basicCalculator(process.argv[2], process.argv[3], process.argv[4]);

function basicCalculator(firstNum, secondNum, operator) {
    // convert string arguments to numbers
    firstNum = Number(firstNum);
    secondNum = Number(secondNum);

    // calculate result
    let result;
    switch(operator) {
        case '+':
            result = firstNum + secondNum;
            break;
        case '-':
            result = firstNum - secondNum;
            break;
        case '*':
            result = firstNum * secondNum;
            break;
        case '/':
            result = firstNum / secondNum;
            break;
    }
    console.log(`${firstNum} ${operator} ${secondNum} = ${result}`);
}