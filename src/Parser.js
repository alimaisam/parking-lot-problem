const ParkingLot = require("./models/ParkingLot")

const validCommands = ['create_parking_lot', 'park', 'leave', 'status', 'registration_numbers_for_cars_with_colour', 'slot_numbers_for_cars_with_colour', 'slot_number_for_registration_number'];

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
                    const lot = ParkingLot.create(splitCommand[1]);
                    console.log(lot.totalParkingSpots);
                    console.log(["Created a parking lot with", splitCommand[1], "slots"].join(" "));
                }
                case 'park': {

                } 
                case 'leave': {

                } 
                case 'status': {

                } 
                case 'registration_numbers_for_cars_with_colour': {

                } 
                case 'slot_numbers_for_cars_with_colour': {

                } 
                case 'slot_number_for_registration_number': {

                } 
                default : return false;
            }
        } else {

        }
    }
};