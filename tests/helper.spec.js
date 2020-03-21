const expect = require('chai').expect;

const ParkingLot = require('../src/models/ParkingLot');
const Utilts = require('../src/helper')

xdescribe('parse registration_numbers_for_cars_with_colour command', function() {
    var lot = {}
    beforeEach(function() {
        lot = ParkingLot.create(6);
        Utilts.parkCar(lot.parkingSpots, 'park MPH-01-0001 White')
        Utilts.parkCar(lot.parkingSpots, 'park MPH-01-0002 White')
        Utilts.leaveParkingLot(lot.parkingSpots, 'leave 1')

        console.log(lot);
    })

    it('should get the registration number of cars with color white', function() {
        const command = 'registration_numbers_for_cars_with_colour White'
        const output = Utilts.getCarRegistrationNumberByColor(lot.parkingSpots, command);

        expect(output).to.eql(['MPH-01-0001', 'MPH-01-0002']);
        
    })
})