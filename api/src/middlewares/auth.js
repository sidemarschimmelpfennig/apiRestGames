const jwt = require("jsonwebtoken")

const auth =(req, res, next)=>{
    const authToken = req.headers['Authorization']
    if (authToken !== undefined){
        const bearer = authToken.split(' ')
        var token = bearer[1] 

        jwt.verify(token, process.env.JWTSECRET, (err, data)=>{
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
        res.status(401).json({err : "Token inválido!"})
    }

  
}


module.exports = auth