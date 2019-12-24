const gpio = require('rpi-gpio');

var pin = 21;
gpio.setup(pin, gpio.DIR_IN);


async function test(){
    var ips = await gpio.read(pin);
    if(ips === true){
        console.log("Moisture detected");
    } else if(ips === false){
        console.log("Moisture not detected")
    }
}

setInterval(function(){ test() }, 1000);