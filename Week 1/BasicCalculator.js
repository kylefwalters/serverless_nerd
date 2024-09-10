{
    let arguments = process.argv.slice(2);
    basicCalculator.apply(null, arguments);
}

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
        default:
            console.log(`Operator "${operator}" is invalid`);
            return null;
    }
    console.log(`${firstNum} ${operator} ${secondNum} = ${result}`);
    return result;
}