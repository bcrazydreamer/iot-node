"use strict";
const express               = require('express');
const router                = express.Router();

router.get('/',(req,res,next)=>{
    res.renderCompress("index",{})
});

module.exports = router;