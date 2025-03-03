import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/ping', (rq: Request, rs: Response)=> {
    rs.send("pong");
})

const port = 5000;
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
    
})