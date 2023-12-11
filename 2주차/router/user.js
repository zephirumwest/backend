const express = require('express')
const router = express.Router();


const data = [];

router.route('/')
.get((req,res)=>{
    res.send(data[req.query.index])
})
.post((req,res)=>{
    if(req.signedCookies['id']=='member'){
        data.push(req.body.data);
        res.sendStatus(201);
    }else{
        console.log('no users');
        res.sendStatus(401);
    }
})
.put((req,res)=>{
    if(req.signedCookies['id']=='member'){
        data[req.query.index]=req.body.data
        res.sendStatus(200);
    }else{
        console.log('no users');
        res.sendStatus(401);
    }
})
.delete((req,res)=>{
    if(req.signedCookies['id']=='member'){
        data.splice(req.query.index,1)
        res.sendStatus(200);
    }else{
        console.log('no users');
        res.sendStatus(401);
    }
})

module.exports = router;