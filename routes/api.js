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
    var status = req.body.state === true ? true : false;
    gpio.write(7, status, function(err) {
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

router.get('/ping',(req,res,next)=>{
    res.send("pong");
});

module.exports = router;