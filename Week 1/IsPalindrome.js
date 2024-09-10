isPalindrome(process.argv[2], process.argv[3]);

function isPalindrome(arg, enableDebug) {
    // Check that argument is given
    if(!arg) {
        console.log("Invalid Argument");
        return;
    }

    // Strip non-alphabetic characters & unify casing
    arg = arg.replace(/([$&+,:;=?@#|'"<>.^*(){}%~_\[\]!-])|(\s)/g, "").toLowerCase();

    // Iterate through string recursively
    if(recursivePalidrome(arg, 0, enableDebug)) {
        console.log("Is a palindrome");
    } else {
    console.log("Not a palindrome");
    }
}

function recursivePalidrome(arg, index, enableDebug) {
    if(index >= (arg.length - 1) / 2) {
        return true;
    }

    let left = index;
    let right = arg.length - 1 - index;
    if(enableDebug == 'true') {
        console.log("left = " + arg[left] + ", right = " + arg[right]);
    }

    if(arg[left] != arg[right]) {
        return false;
    }

    return recursivePalidrome(arg, index + 1, enableDebug);
}