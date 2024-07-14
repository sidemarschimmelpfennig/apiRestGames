# Api de Games (Protópio não finalizado)
Esta API é utilizada para executar um blog de games ... 
## Endpoints
### GET /games
Responsável por Exibir todos os games. 
#### Parametros 
Nenhum.
#### Respostas
##### OK! 200
Caso essa resposta ocorra, você receberá a listagem com todos os games. 


Exemplo de retorno :

```
{
 "games":[{
    "id": "49a58963-26ff-4c0e-8cb7-8e3d12315c54",
    "title": "Need ",
    "year": "2024",
    "price": "2.50"
  },
  {
    "id": "308f34d2-1569-4056-b12b-76731fc078a5",
    "title": "Need ",
    "year": "2024",
    "price": "2.50"
  }],
}
```
##### Falha na autenticação! 401
Caso essa resposta ocorra, isso significa que aconteceu alguma falha durante o processo de autenticação. 
Motivos : Token inválido, Token expirado. 

Exemplo de retorno : 

```
{
    "err" : "Token Inválido"
}
```

### POST /auth
Esse endpoint é resposável por retornar e fazer o processo de login na apicação. 
#### Parametros
email : E-mail cadastado no sistema.
password : Senha do usuário cadastrado no sistema, com aquele determinado email. 

Exemplo: 
```
{
    "email" : "teste@gmail.com",
    "password" : "123"
}
```
##### OK! 200
Caso essa resposta ocorra, você receberá o token jwt para acessar rotas protegidas. 


Exemplo de retorno :
````
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzaWRlbWFyc2NoaUBnbWFpbC5jb20iLCJpYXQiOjE3MjA4MDM1ODYsImV4cCI6MTcyMDk3NjM4Nn0.rRCkVeAj-KsNKcLHOPVipnY0cJr1KRHMwOwbD0_oQc8"
}

````


#####  Falha na autenticação! 401
Caso essa resposta ocorra, isso significa que ouve alguma falha durante o processo da requisição.
Motivos : E-mail ou senha incorretos.

Exemplo de retorno :

````
{
    "err": "Credenciais inválidas!"
}
````