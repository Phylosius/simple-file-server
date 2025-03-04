import express, {Router, Request, Response} from 'express';
import multer, {Multer} from 'multer';

const app: Router = express.Router();
const upload: Multer = multer({
    dest: 'uploads/'
})

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
    res.json(req.file)
})

export default app;
