const expect = require("chai").expect;

const ParkingLot = require('../src/models/ParkingLot')
const ParkingSpot = require('../src/models/ParkingSpot')
const Car = require('../src/models/Car')

describe('test Models', function() {
    describe('Parking Lot Creation', function() {
        it ('should create a new parking lot', function() {
            var lot = ParkingLot.create(6);
    
            expect(lot).to.be.an('object');
            expect(lot).to.have.property('totalParkingSpots');
            expect(lot).to.have.property('parkingSpots');
        })
    })
    
    describe('Parking Spot Initialization', function() {
        it ('should initializes a new parking spot', function() {
            var spot = ParkingSpot.initialize(2);
    
            expect(spot).to.be.an('array');
            expect(spot[0]).to.have.property('spotNumber').eq(1);
            expect(spot[0]).to.have.property('Car').eq(null);
            expect(spot[0]).to.have.property('available').eq(true);
        })
    })
    
    describe('Car Entry', function() {
        it ('should enter the car with reg number and color', function() {
            var car = Car.enter("MPH-123-01", "White")
    
            expect(car).to.be.an('object');
            expect(car).to.have.property('registrationNumber').eq("MPH-123-01");
            expect(car).to.have.property('color').eq("White");
        })
    })
})
