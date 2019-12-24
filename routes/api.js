"use strict";
const express               = require('express');
const router                = express.Router();

router.post('/',(req,res,next)=>{
    res.status(200).json({
        success : true,
        data	: req.body
    });
});

router.get('/ping',(req,res,next)=>{
    res.send("pong");
});

module.exports = router;