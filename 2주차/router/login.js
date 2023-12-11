const express = require('express')
const router = express.Router();

const id = 'member';
const password = 'member123';

router.post('/',(req,res)=>{
    if(req.body.id == id && req.body.password==password){
        res.cookie('id','member',{signed:true})
        res.sendStatus(200);
    }else{
        console.log('login failed')
        res.sendStatus(401);
    }
})

module.exports = router;