// Takes args passed via command line, and inserts them as arguments for function callback
function getArgsFromCLI(callback) {
    const args = process.argv.slice(2);
    callback(args);
}

module.exports = {getArgsFromCLI};