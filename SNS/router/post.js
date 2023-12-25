const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const {Post} = require('../models')
const {isLogged} = require('./middle')

const upload = multer({
    storage :multer.diskStorage({
        destination(req,file,cb){
            cb(null,'uploads/')
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname)
            cb(null,path.basename(file.originalname,ext) + Date.now() + ext);
        }
    }),
    limits:{fileSize: 5*1024*1024},
})

router.post('/img',isLogged,upload.single('img'),async(req,res)=>{
    console.log(req.file);
    res.json({url:`/img/${req.file.filename}`})
})

router.post('/',isLogged,async(req,res)=>{
    try{
        const post = await Post.create({
            content:req.body.content,
            img:req.body.url,
            UserId:req.signedCookies['id']
        })
        res.redirect('/')
    }catch(error){
        console.error(error)
        res.sendStatus(500)
    }
})

module.exports = router