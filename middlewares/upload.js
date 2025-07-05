import multer from 'multer';
import {resolve} from "node:path";
import { v4 as uuidv4 } from 'uuid';

const tempDir = resolve("temp");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, tempDir);
    },
    filename: (req, file, callback) => {
        const filename = `${uuidv4()}_${file.originalname}`
        callback(null, filename);
    }
});

export const upload = multer({storage});