var parkingSpots = [];

function ParkingSpot(spotNumber) {
    this.spotNumber = spotNumber;
    this.Car = null;
    this.available = true;
}

module.exports = {
    initialize: function(spots) {
        for(var i = 0; i < spots; i++) {
            const spot = new ParkingSpot(i+1);
            parkingSpots.push(spot);
        }
        return parkingSpots;
    }
}