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
            console.log("Allocated slot number: " + spot.spotNumber);
        } else {
            console.log("Sorry, parking lot is full");
        }  
    },

    leaveParkingLot: function(allParkingSpots, input) {
        if (allParkingSpots.length > 0) {
            var index = parseInt(input.split(" ")[1]) - 1;
            if(index > -1 && index <= allParkingSpots.length) {
                var spot = allParkingSpots[index];
                spot.Car = null;
                spot.available = true;
                console.log("Slot number " + spot.spotNumber + " is free")
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
        console.log(status);
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

            regNumbers.length === 0 ? console.log("Not found") : console.log(regNumbers.join(", "));
        } else {
            console.log("Not found");
        }
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

            spotNumbers.length === 0 ? console.log("Not found") : console.log(spotNumbers.join(", "));
            
        } else {
            console.log("Not found");
        }
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

            spotNumber === 0 ? console.log("Not found") : console.log(spotNumber);
            
        } else {
            console.log("Not found");
        }
    }
}