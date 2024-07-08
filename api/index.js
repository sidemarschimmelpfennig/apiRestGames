const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const { v4: uuidv4 }= require('uuid')
const jwt = require("jsonwebtoken")

app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

const JWTSecret = "jwtSECRET"



const DB = {
    games : [
        {
            id : 203,
            title : "Need",
            year : 2022,
            price : 60
        },
        {
            id : 23,
            title : "Fifa 21",
            year : 2021,
            price : 60
        },
        {
            id : 1,
            title : "Free Fire",
            year : 2024,
            price : 60
        },
        {
            id : 5,
            title : "CS",
            year : 2023,
            price : 60
        }
    ],
    users : [
        {
            id: 1,
            name : "Sidemar Junior",
            email : "sidemarschi@gmail.com",
            password : "nodejs>3"
        }
    ]
}

function auth(req, res, next){
    const authToken = req.headers['authorization']
    if (authToken !== undefined){
        const bearer = authToken.split(' ')
        var token = bearer[1] 

        jwt.verify(token, JWTSecret, (err, data)=>{
                if(err){
                    res.status(401);
                    res.json({err:"Token inválido!"});
                }else{

                    req.token = token;
                    req.loggedUser = {id: data.id,email: data.email};
                    req.empresa = "Guia do programador";                
                    next();
                }
            
            }
        )
    }else{
        res.status(401).json({err : " y "})
    }

  
}


app.get('/games', auth ,(req, res)=>{
    res.statusCode = 200
    res.json(DB.games)
})

app.get('/games/:id' ,(req, res)=>{
    let game = parseInt(req.params.id)
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var exist = DB.games.find(g => g.id == game)
        if (exist != undefined){
            res.statusCode(200)
            res.json(exist)
        }else{
            res.sendStatus(404)
            
        }
        
    }
})

app.post('/game' ,(req, res)=>{
    let { title , year, price} = req.body
    let id = uuidv4()
    let game = ({
        id ,
        title,
        year,
        price
    }) 
    addItem(game)
    res.sendStatus(200)
})

app.delete("/game/:id",(req, res)=>{
    let game = parseInt(req.params.id)
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var index = loadDatabase().findIndex(g => g.id == game)
    
       if(index == -1 || undefined){
        res.sendStatus(404)
       }else{
            loadDatabase().splice(index , 1)
            res.sendStatus(200)
       } 
    }
})

app.put("/game/:id", (req, res)=>{
    const {id} = req.params
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        var game = DB.games.find(g => g.id == parseInt(id))
        
        if(game != undefined){
            let {title, price, year} = req.body

            if(price != undefined){
                game.price = price
            }
            if(title != undefined){
                game.title = title
            }
            if(year != undefined){
                game.year = year
            }
            res.sendStatus(200)
        }else{
            res.sendStatus(404)
        }
        
    }
})

app.post("/auth",(req, res) => {

    var {email, password} = req.body;

    if(email != undefined){

        var user = DB.users.find(u => u.email == email);
        if(user != undefined){
            if(user.password == password){
                jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn:'48h'},(err, token) => {
                    if(err){
                        res.status(400);
                        res.json({err:"Falha interna"});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                })
            }else{
                res.status(401);
                res.json({err: "Credenciais inválidas!"});
            }
        }else{
            res.status(404);
            res.json({err: "O E-mail enviado não existe na base de dados!"});
        }

    }else{
        res.status(400);
        res.send({err: "O E-mail enviado é inválido"});
    }
});


app.listen(3200, ()=>{
    console.log('teste')
})
