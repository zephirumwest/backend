const express = require('express')
const router = express.Router()
const {User,Post} = require('../models')

router.get('/',async(req,res)=>{
    if(req.signedCookies['id']){
        const posts = await Post.findAll({
            inclue:{
                model:User,
                attributes:['id','nick']
            },
            order:[['createdAt','DESC']]
        })
        return res.send(posts)
    }
    res.send('메인 페이지입니다.')
})

module.exports = router