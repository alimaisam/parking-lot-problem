const fs = require('fs');
const parser = require('./src/Parser');

const contents = fs.readFileSync('./data/file_input.txt', 'utf8');
parser.parseFile(contents);