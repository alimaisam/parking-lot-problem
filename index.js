const fs = require('fs');
const parser = require('./src/Parser');
const prompt = require('prompt');

var elements = process.argv;

if(elements[elements.length - 1] == 'true') {
    prompt.start();
    interact();
} else {
    const contents = fs.readFileSync('./data/file_input.txt', 'utf8');
    parser.parseFile(contents);
}

function interact() {
    prompt.get(['command'], (err, result) => {
        if (err) throw err;
        
        if (result.command.toLowerCase() === "exit") {
          return;
        }

        parser.parseCommandAndExecute(result.command);
        interact();
    });
}

