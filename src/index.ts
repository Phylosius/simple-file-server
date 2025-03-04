import express, { Express } from 'express';
import dotenv from 'dotenv';

import file_route from './routes/files';
import ping_route from './routes/ping';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Express = express();

app.use('/files', file_route);
app.use('/ping', ping_route);

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
    
})