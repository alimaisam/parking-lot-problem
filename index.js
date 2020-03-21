const fs = require('fs');
const prompt = require('prompt');
const parser = require('./src/Parser');
const utils = require('./src/helper');

var elements = process.argv;

if(elements[elements.length - 1] == 'true') {
    prompt.start();
    interact();
} else {
    const contents = fs.readFileSync(elements[2], 'utf8');
    parser.parseFileData(contents);
}

function interact() {
    prompt.get(['command'], (err, result) => {
        if (err) throw err;
        
        if (result.command.toLowerCase() === "exit") {
          return;
        }

        const output = parser.parseCommandAndExecute(result.command);
        utils.logOutput(output);
        interact();
    });
}

