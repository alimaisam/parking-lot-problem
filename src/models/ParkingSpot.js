const Car = require("./Car");

var parkingSpots = [];

function ParkingSpot(spotNumber) {
    this.spotNumber = spotNumber;
    this.Vehicle = null;
    this.available = true;
}

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
    create: function(spots) {
        for(var i = 0; i < spots; i++) {
            const spot = new ParkingSpot(i+1);
            parkingSpots.push(spot);
        }

        return parkingSpots;
    },

    park: function(allParkingSpots, input) {
        if (findParking(allParkingSpots)) {
            var spot = findParking(allParkingSpots);
            spot.Vehicle = Car.create(input.split(" ")[1], input.split(" ")[2]);
            spot.available = false;
            console.log("Allocated slot number: " + spot.spotNumber);
            return allParkingSpots;
        } else {
            console.log("Sorry, parking lot is full");
        }
                
    },

    leave: function(allParkingSpots, input) {
        if (allParkingSpots.length > 0) {
            var index = parseInt(input.split(" ")[1]) - 1;
            if(index > -1 && index <= allParkingSpots.length) {
                var spot = allParkingSpots[index];
                spot.Vehicle = null;
                spot.available = true;
    
            }
        }

        return allParkingSpots;
    }

}