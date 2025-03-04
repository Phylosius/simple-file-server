import express, {Router, Request, Response} from 'express';

const route: Router = express.Router();

route.get('/', (req: Request, res: Response)=>{
    res.status(200).send('pong');
})

export default route;