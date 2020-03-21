const ParkingSpot = require("./ParkingSpot");

module.exports = {
    create: function(spots) {
        return {
            totalParkingSpots: spots,
            parkingSpots: ParkingSpot.create(spots)
        }
    }
}