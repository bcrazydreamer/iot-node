const gpio = require('rpi-gpio');
const chalk = require('chalk');

var pin = 21;
var pin2 = 20;

gpio.setMode(gpio.MODE_BCM);
gpio.setup(pin, gpio.DIR_IN,gpio.EDGE_FALLING);
gpio.setup(pin2, gpio.DIR_OUT);

function output(status) {
	var mode = (status === false) ? 1 : 0;
	gpio.write(pin2, mode, function(err) {
        if (err){
        	console.log("err_2====>",err);
        };
        var msg;
        if(status === false){
        		msg = chalk.red("Moisture detected");
        } else {
        	msg = chalk.green("Moisture not detected");
        }
        console.log(msg);
	});
}

function test() {
	  gpio.read(pin, (err, data) => {
		   if (err) {
			    return console.log("err_1====>",err);
			}
			return output(data);
	  });
}

gpio.on('change', function(channel, value) {
 	return test()
})