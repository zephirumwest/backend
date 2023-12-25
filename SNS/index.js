const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()
const {sequelize} = require('./models')

const pageRouter = require('./router/page')
const authRouter = require('./router/auth')
const postRouter = require('./router/post')

sequelize.sync({force:false})
.then(()=>{
    console.log('데이터베이스 연결 성공')
})
.catch((err)=>{
    console.error(err)
})

app.use('/img',express.static('uploads'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/',pageRouter)
app.get('/login',(req,res)=>{
    res.send('로그인이 필요한 서비스입니다.')
})
app.use('/auth',authRouter)
app.use('/post',postRouter)

app.listen(process.env.PORT,()=>{
    console.log(`${process.env.PORT}번 포트에서 대기중`)
})