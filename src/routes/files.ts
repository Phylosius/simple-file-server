import express, {Router, Request, Response} from 'express';
import multer, {Multer} from 'multer';
import dotenv from 'dotenv';

import {getByID, save} from './../services/db';

dotenv.config();

const UPLOADS_DIR = process.env.UPLOADS_DIR ||'uploads/';

const route: Router = express.Router();
const upload: Multer = multer({
    dest: UPLOADS_DIR
})

route.post('/upload', upload.single('file'), (req: Request, res: Response) => {
    const file = req.file;
    let saveStatus = 'UNKNOW';
    
    try {
        save({id: file?.filename,
            name: file?.originalname,
            mimetype: file?.mimetype, 
            path: `${UPLOADS_DIR}${file?.filename}`,
            size: file?.size
           });
        saveStatus = 'SAVED'
    } catch (e) {
        saveStatus = "FAILED";
    }

    res.json({
        'saveStatus': saveStatus,
        'fileId': file?.filename,
        'fileName': file?.originalname
    });
})

route.get('/download/:fileID', (req: Request, res: Response) => {
    const fileID = req.params.fileID;
    
    res.download(`uploads/${fileID}`, `${fileID}`, (err)=>{
        res.status(500).send(`error: ${err}`);
    })
})

route.get('/infos/:fileID', (req: Request, res: Response)=>{
    const id = req.params.fileID;
    let fileInfos;
    getByID(id).then(result=>{
        fileInfos = result;
        res.json(fileInfos[0]);
    });
    
})

export default route;
