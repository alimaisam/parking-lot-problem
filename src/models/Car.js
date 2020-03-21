function Car(regNumber, color) {
    this.registrationNumber =  regNumber;
    this.color = color;
}

module.exports = {
    create: function(regNumber, color) {
        return new Car(regNumber, color);
    }
}