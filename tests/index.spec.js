const assert = require("chai").assert;
var fs = require('fs');

describe('File reading test', function() {
    it('Read test input', function(done) {
      fs.readFile('./data/file_input.txt', 'utf-8', function(err, data) {
        if (err) {
          throw "Unable to read file";
        }
        commands = JSON.parse(JSON.stringify(data)).split("\n");
        done();
      });
    });
  
    it('Checking Commands', function(done) {
          assert.equal(commands[0].split(" ")[0],"create_parking_lot");
          assert.equal(commands[1].split(" ")[0],"park");
          assert.equal(commands[7].split(" ")[0],"leave");
          assert.equal(commands[8],"status");
          done();
    });
  });