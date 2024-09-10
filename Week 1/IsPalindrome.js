isPalindrome(process.argv[2], process.argv[3]);

function isPalindrome(arg, enableDebug) {
    // Strip non-alphabetic characters & unify casing
    arg = arg.replace(/([$&+,:;=?@#|'"<>.^*(){}%~_\[\]!-])|(\s)/g, "").toLowerCase();

    // Iterate through string
    let left = 0;
    let right = arg.length - 1;
    while(left < right) {
        if(enableDebug == 'true') {
            console.log("left = " + arg[left] + ", right = " + arg[right]);
        }

        if(arg[left] != arg[right]) {
            console.log("Not a palindrome");
            return false;
        }
        left++;
        right--;
    }

    console.log("Is a palindrome");
    return true;
}