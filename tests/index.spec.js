const chai = require("chai");

describe('Testing', function() {
    it('Should Pass', function() {
        var flag = true;
        chai.expect(flag).to.be.true;
    })
})