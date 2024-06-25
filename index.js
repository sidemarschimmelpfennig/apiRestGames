const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())


var DB={
    games:[
    
    {
        id : 23,
        title : "Call of Duty",
        year : 2019,
        price: 60    
    },
    {
        id : 65,
        title : "Counter Strike",
        year : 2010,
        price: 0  
    },
    {
        id : 22,
        title : "Minecraft",
        year : 2012,
        price: 60    
    },

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
            res.statusCode = 200
            res.json(exist)
        }else{
            res.sendStatus(404)
            
        }
        
    }
})

app.post('/game' ,(req, res)=>{
    let {id, title , year, price} = req.body
    DB.games.push({
        id,
        title,
        year,
        price
    }) 
    res.sendStatus(200)
})

app.delete("/game/:id",(req, res)=>{
    let game = parseInt(req.params.id)
    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
        var index = DB.games.findIndex(g => g.id == game)
    
       if(index == -1 || undefined){
        res.sendStatus(404)
       }else{
            DB.games.splice(index , 1)
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

app.listen(3200, ()=>{
    console.log('teste')
})
