const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const {User} = require('../models')

router.post('/join',async (req,res)=>{
    const {email, password,nick} = req.body
    const hash = await bcrypt.hash(password,12)
    const exUser = await User.findOne({
        where:{
            email:email
        }
    })
    if(exUser){
        return res.send('해당하는 이메일의 유저가 존재합니다.')
    }
    let result = await User.create({
        email:email,
        nick:nick,
        password:hash
    })
    res.redirect('/')
})

router.post('/login',async(req,res)=>{
    const { email,password } = req.body
    const user = await User.findOne({
        where:{
            email:email
        }
    })
    if(user){
        const same = bcrypt.compareSync(password, user.password)
        if(same){
            res.cookie('id',user.id,{signed:true})
            return res.redirect('/')
        }
    }
    res.send('로그인에 실패했습니다.')
})

router.get('/logout',(req,res)=>{
    res.cookie('id','1',{maxAge:0,signed:true})
    res.redirect('/')
})

module.exports = router