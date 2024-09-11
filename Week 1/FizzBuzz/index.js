{
    const argument = process.argv[2];
    fizzBuzz(argument);
}

function fizzBuzz(number) {
    let index = 1;
    while(index <= number) {
        const fizzBuzz = (index % 3 === 0 ? "Fizz" : "") + 
            (index % 5 === 0 ? "Buzz" : "");
        const output = fizzBuzz === "" ? index : fizzBuzz;

        console.log(output);
        index++;
    }
}