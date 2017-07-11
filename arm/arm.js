var Gpio = require('pigpio').Gpio;

var parties = ['GRIP', 'RIGHT_ARM', 'LEFT_ARM', 'BASE'];

var arm = {
    GRIP: {
        gpio: 18,
        minPulseWidth: 1750,
        maxPulseWidth: 2000
    },
    RIGHT_ARM: {
        gpio: 17,
        minPulseWidth: 1000,
        maxPulseWidth: 2000
    },
    LEFT_ARM: {
        gpio: 17,
        minPulseWidth: 1000,
        maxPulseWidth: 2000
    },
    BASE: {
        gpio: 24,
        minPulseWidth: 1000,
        maxPulseWidth: 2000
    }
}

var Motor = function (name, servo) {
    this.name = name;
    this.gpioPin = servo.gpio;
    this.minPulseWidth = servo.minPulseWidth;
    this.maxPulseWidth = servo.maxPulseWidth;
    this.centerPulseWidth = 1750;

    this.motor = new Gpio(servo.gpio, { mode: Gpio.OUTPUT });


    this.update = function (pulseWidth) {
        this.motor.servoWrite(pulseWidth);
        console.log('wrote grip: ' + pulseWidth);
    }

    this.center = function () {
        this.motor.servoWrite(this.centerPulseWidth);
    }

    this.getName = function () {
        return this.name;
    }
}

var motors = parties.map((party) => {
    return new Motor(party, arm[party]);
});

module.exports = motors;

