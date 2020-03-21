const ParkingLot = require("./models/ParkingLot")
const Utils = require("./helper")

const validCommands = ['create_parking_lot', 'park', 'leave', 'status', 'registration_numbers_for_cars_with_colour', 'slot_numbers_for_cars_with_colour', 'slot_number_for_registration_number'];
var lot = {};
module.exports = {
    parseFile: function (data) {
        const commands = data.split("\n");
        for (var i = 0; i < commands.length; i++) {
            this.parseCommandAndExecute(commands[i]);
        }
    },

    parseCommandAndExecute: function (command) {
        const splitCommand = command.split(' ');
        if (validCommands.indexOf(splitCommand[0]) > -1) {
            switch(splitCommand[0]) {
                case 'create_parking_lot' : {
                    lot = ParkingLot.create(lot, splitCommand[1]);
                    break;
                }
                case 'park': {
                    const spot = Utils.parkCar(lot.parkingSpots, command)
                    spot > 0 ? console.log("Allocated slot number: " + spot.spotNumber) : console.log("Sorry, parking lot is full");
                    break;
                } 
                case 'leave': {
                    const spot = Utils.leaveParkingLot(lot.parkingSpots, command)
                    spot > 0 ? console.log("Slot number " + spot.spotNumber + " is free") : console.log("Spot Number not found");
                    break;
                } 
                case 'status': {
                    const status = Utils.getStatus(lot.parkingSpots);
                    console.log(status);
                    break;
                } 
                case 'registration_numbers_for_cars_with_colour': {
                    const regNumbers = Utils.getCarRegistrationNumberByColor(lot.parkingSpots, command);
                    regNumbers.length === 0 ? console.log("Not found") : console.log(regNumbers.join(", "));
                    break;
                } 
                case 'slot_numbers_for_cars_with_colour': {
                    const spotNumbers = Utils.getSlotNumberByColor(lot.parkingSpots, command);
                    spotNumbers.length === 0 ? console.log("Not found") : console.log(spotNumbers.join(", "));
                    break;
                } 
                case 'slot_number_for_registration_number': {
                    const spot = Utils.getSlotNumberForCar(lot.parkingSpots, command)
                    spot === 0 ? console.log("Not found") : console.log(spot);
                    break;
                }
            }
        } else {
            console.log("Please try other command");
        }
    },
};