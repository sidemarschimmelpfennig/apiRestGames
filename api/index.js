const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const { v4: uuidv4 }= require('uuid')


app.use(cors())


app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

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




app.get('/games' ,(req, res)=>{
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

app.post("/auth" ,(req, res )=>{
    let { email, password } = req.body
    let user
    if(email != undefined){
        if(password != undefined){
            user = DB.users.find(user => user.email == email);
            if(user != undefined ){
                if(user.password == password){
                    res.status(200)
                    res.json({token : "TOKEN INVÁLIDO"})
                }else{
                    res.status(401) 
                    res.json({err : "Credenciais Inválidas"})
                }
            }else{
                res.status(404)
                res.json({err : "Email não encontrado na base de dados"})
            }
        }else{
            res.status(400)
            res.json({err : "Senha inválido"})
        }
    }else{
        res.status(400)
        res.json({err : "email inválido"})
    }
})


app.listen(3200, ()=>{
    console.log('teste')
})
