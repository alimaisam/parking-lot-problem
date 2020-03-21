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
                    
                    Utils.park(lot.parkingSpots, command)
                    break;
                } 
                case 'leave': {
                    Utils.leave(lot.parkingSpots, command)
                    break;
                } 
                case 'status': {
                    Utils.status(lot.parkingSpots);
                    break;
                } 
                case 'registration_numbers_for_cars_with_colour': {
                    Utils.getCarRegistrationNumberByColor(lot.parkingSpots, command);
                    break;
                } 
                case 'slot_numbers_for_cars_with_colour': {
                    Utils.getSlotNumberByColor(lot.parkingSpots, command);
                    break;
                } 
                case 'slot_number_for_registration_number': {
                    Utils.getSlotNumberForCar(lot.parkingSpots, command)
                    break;
                } 
                default : return false;
            }
        } else {

        }
    }
};