const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const port = 3000;
const user = require('./router/user')
const login = require('./router/login')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser(['secret']))

app.get('/',(req,res)=>{
    res.send("Hello world");
})

app.use('/user',user);
app.use('/login',login)

app.use('*',(req,res)=>{
    res.send("존재하지 않습니다.")
})

app.listen(port,()=>{
    console.log(`Listening on port : ${port}`);
})


