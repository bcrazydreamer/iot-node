const gpio = require('rpi-gpio');

var pin = 21;
gpio.setMode(gpio.MODE_BCM);
gpio.setup(pin, gpio.DIR_IN);

function test() {
	  gpio.read(pin, (err, data) => {
		      if (err) {
			            return console.log(err);
			          }
		      if (data === true) {
			            return console.log("Moisture not detected");
			          } else if (data === false) {
					        return console.log("Moisture detected");
					      }
		    });
}

setInterval(function () { test() }, 1000);
