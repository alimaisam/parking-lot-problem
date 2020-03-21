const ParkingLot = require("./models/ParkingLot")
const Utils = require("./helper");

const validCommands = ['create_parking_lot', 'park', 'leave', 'status', 'registration_numbers_for_cars_with_colour', 'slot_numbers_for_cars_with_colour', 'slot_number_for_registration_number'];
var lot = {};
module.exports = {
    parseFileData: function (data) {
        const commands = data.split("\n");
        for (var i = 0; i < commands.length; i++) {
            const output = this.parseCommandAndExecute(commands[i]);
            Utils.logOutput(output);
        }
    },

    parseCommandAndExecute: function (command) {
        const splitCommand = command.split(' ');
        if (validCommands.indexOf(splitCommand[0]) > -1) {
            switch(splitCommand[0]) {
                case 'create_parking_lot' : {
                    lot = ParkingLot.create(lot, splitCommand[1]);

                    return {
                        type: 'parking-lot',
                        data: lot.totalParkingSpots
                    }
                }
                case 'park': {
                    const spot = Utils.parkCar(lot.parkingSpots, command)
                    
                    return {
                        type: 'park-car',
                        data: spot
                    }
                } 
                case 'leave': {
                    const spot = Utils.leaveParkingLot(lot.parkingSpots, command)
                    
                    return {
                        type: 'leave-parking',
                        data: spot
                    }
                } 
                case 'status': {
                    const status = Utils.getStatus(lot.parkingSpots);
                    
                    return {
                        type: 'status-check',
                        data: status
                    }
                } 
                case 'registration_numbers_for_cars_with_colour': {
                    const regNumbers = Utils.getCarRegistrationNumberByColor(lot.parkingSpots, command);
                    
                    return {
                        type: 'fetch-data',
                        data: regNumbers.length === 0 ? "Not found" : regNumbers.join(", ")
                    }
                } 
                case 'slot_numbers_for_cars_with_colour': {
                    const spotNumbers = Utils.getSlotNumberByColor(lot.parkingSpots, command);
                    
                    return {
                        type: 'fetch-data',
                        data: spotNumbers.length === 0 ? "Not found" : spotNumbers.join(", ")
                    }
                } 
                case 'slot_number_for_registration_number': {
                    const spot = Utils.getSlotNumberForCar(lot.parkingSpots, command)
                    
                    return {
                        type: 'fetch-data',
                        data: spot === 0 ? "Not found" : spot
                    }
                }
            }
        } else {
            return {
                type: 'error',
                data: 'Command not valid'
            }
        }
    },
};