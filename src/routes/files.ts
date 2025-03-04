import express, {Router, Request, Response} from 'express';
import multer, {Multer} from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app: Router = express.Router();
const upload: Multer = multer({
    dest: process.env.UPLOADS_DIR ||'uploads/'
})

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
    res.json(req.file)
})

app.get('/download/:fileID', (req: Request, res: Response) => {
    const fileID = req.params.fileID;
    
    res.download(`uploads/${fileID}`, `${fileID}`, (err)=>{
        res.status(500).send(`error: ${err}`);
    })
})

export default app;
