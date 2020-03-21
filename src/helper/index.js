const Car = require("../models/Car");

function findParking(spots) {
    if (spots.length > 0) {
        for (var i = 0; i < spots.length; i++) {
            if (spots[i].available) {
                return spots[i];
            }
        }
    } else {
        return false;
    }
}

module.exports = {
    parkCar: function(allParkingSpots, input) {
        if (findParking(allParkingSpots)) {
            var spot = findParking(allParkingSpots);
            spot.Car = Car.enter(input.split(" ")[1], input.split(" ")[2]);
            spot.available = false;
            return spot.spotNumber;
        } else {
            return 0;
        }  
    },

    leaveParkingLot: function(allParkingSpots, input) {
        if (allParkingSpots.length > 0) {
            var index = parseInt(input.split(" ")[1]) - 1;
            if(index > -1 && index <= allParkingSpots.length) {
                var spot = allParkingSpots[index];
                spot.Car = null;
                spot.available = true;
                return spot.spotNumber;
            } else {
                return 0;
            }
        }
    },
    
    getStatus: function (allParkingSpots) {
        const header = ["Slot No.", "Registration No.", "Color"].join("\t");
        var strBuilder = [];
        strBuilder.push(header);
        for (var i = 0; i < allParkingSpots.length; i++) {
            const spot = allParkingSpots[i];
            const car = allParkingSpots[i].Car
            if (!spot.available) {
                var lineBuilder = [spot.spotNumber, car.registrationNumber, car.color].join("\t\t");
                strBuilder.push(lineBuilder);
            }
        }

        var status = strBuilder.join("\n");
        return status;
    },

    getCarRegistrationNumberByColor: function (allParkingSpots, input) {
        const color = input.split(" ")[1];
        var regNumbers = [];
        if (allParkingSpots.length > 0) {
            for (var i = 0; i < allParkingSpots.length; i++) {
                if (allParkingSpots[i].Car.color === color) {
                    regNumbers.push(allParkingSpots[i].Car.registrationNumber);
                }
            }
        } 

        return regNumbers;
    },

    getSlotNumberByColor: function (allParkingSpots, input) {
        const color = input.split(" ")[1];
        var spotNumbers = [];
        if (allParkingSpots.length > 0) {
            for (var i = 0; i < allParkingSpots.length; i++) {
                if (allParkingSpots[i].Car.color === color) {
                    spotNumbers.push(allParkingSpots[i].spotNumber);
                }
            }  
        } 

        return spotNumbers;
    },
    
    getSlotNumberForCar: function (allParkingSpots, input) {
        const regNumber = input.split(" ")[1];
        var spotNumber = 0;
        if (allParkingSpots.length > 0) {
            for (var i = 0; i < allParkingSpots.length; i++) {
                if (allParkingSpots[i].Car.registrationNumber === regNumber) {
                    spotNumber = allParkingSpots[i].spotNumber;
                }
            }   
        }

        return spotNumber;
    },

    logOutput: function(output) {
        switch(output.type) {
            case 'parking-lot': {
                console.log("Created a parking lot with " + output.data + " slots");
                break;
            }
            case 'park-car': {
                output.data > 0 ? console.log("Allocated slot number: " + output.data) : console.log("Sorry, parking lot is full");
                break;
            }
            case 'leave-parking': {
                output.data > 0 ? console.log("Slot number " + output.data + " is free") : console.log("Spot Number not found");
                break;
            }
            case 'status-check': {
                console.log(output.data);
                break;
            }
            case 'fetch-data': {
                console.log(output.data);
                break;
            }
            case 'error': {
                console.log(output.data);
                break;
            }
        }
    }
}