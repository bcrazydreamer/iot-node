"use strict";
const express               = require('express');
const router                = express.Router();
const gpio                  = require('rpi-gpio');
const bvalid                = require('bvalid');

gpio.setup(7, gpio.DIR_OUT);

router.post('/',(req,res,next)=>{
    res.status(200).json({
        success : true,
        data	: req.body
    });
});

router.post('/act',(req,res,next)=>{
    var data = req.body;
    if(!bvalid.isObject(data) && !bvalid.isBoolean(req.body.state)){
        return res.status(500).json({
            success : false,
            data	: "Invalid data"
        });
    }
    var pin = req.body.pin
    if(isNaN(pin)){
        return res.status(500).json({
            success : false,
            data	: "Invalid data"
        });
    }
    console.log(req.body);
    var status = (req.body.state === true || req.body.state === "true") ? true : false;
    gpio.write(pin, status, function(err) {
        if (err){
            return res.status(500).json({
                success : false,
                data	: err
            });
        };
        res.status(200).json({
            success : true,
            data	: "On"
        });
    });
});

router.post('/read',(req,res,next)=>{
    var pin = req.body.pin
    if(isNaN(pin)){
        return res.status(500).json({
            success : false,
            data	: "Invalid data"
        });
    }
    pin = Number(pin);
    gpio.read(pin, function(err,resp) {
        if (err){
            return res.status(500).json({
                success : false,
                data	: err
            });
        };
        res.status(200).json({
            success : true,
            data	: resp
        });
    });
});

router.get('/ping',(req,res,next)=>{
    res.send("pong");
});

module.exports = router;