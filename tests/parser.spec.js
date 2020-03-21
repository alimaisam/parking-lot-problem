const expect = require("chai").expect;

const parser = require('../src/Parser');
const ParkingLot = require('../src/models/ParkingLot');

describe('Parsing Commands', function() {
    describe('parse create parking lot command', function() {
        it('should create parking lot with 5 slots', function() {
            const command = 'create_parking_lot 5'
            const output = parser.parseCommandAndExecute(command);
            
            expect(output).to.be.an('object');
            expect(output).to.have.property('type').eq('parking-lot')
            expect(output).to.have.property('data').eq('5')
        })
    })

    describe('parse park and leave commands', function() {
        var lot = {}
        beforeEach(function() {
            lot = ParkingLot.create(6);
        })

        it('should park the car in slot 1', function() {
            const command = 'park MPH-01-0001 White'
            const output = parser.parseCommandAndExecute(command);

            expect(output).to.be.an('object');
            expect(output).to.have.property('type').eq('park-car')
            expect(output).to.have.property('data').eq(1)
        })

        it('should leave the parking spot 1', function() {
            const command = 'leave 1'
            const output = parser.parseCommandAndExecute(command);

            expect(output).to.be.an('object');
            expect(output).to.have.property('type').eq('leave-parking')
            expect(output).to.have.property('data').eq(1)
        })
    })

    describe('parse status command', function() {
        var lot = {}
        beforeEach(function() {
            lot = ParkingLot.create(6);
            const commands = ['create_parking_lot 5', 'park MPH-01-0001 White', 'park MPH-01-0002 White', 'leave 1']
            for (var i = 0; i < commands.length; i++) {
                parser.parseCommandAndExecute(commands[i]);
            }
        })

        it('should get the status of parking lot', function() {
            const command = 'status'
            const output = parser.parseCommandAndExecute(command);

            expect(output).to.be.an('object');
            expect(output).to.have.property('type').eq('status-check')
            expect(output).to.have.property('data')
        })
    })
})