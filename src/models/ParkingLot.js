const ParkingSpot = require("./ParkingSpot");

function ParkingLot(spots) {
    this.totalParkingSpots = spots;
    this.parkingSpots = ParkingSpot.initialize(spots)
}

module.exports = {
    create: function(parkingLot, spots) {
        parkingLot = new ParkingLot(spots);
        console.log("Created a parking lot with " + parkingLot.totalParkingSpots + " slots")
        return parkingLot;
    }
}