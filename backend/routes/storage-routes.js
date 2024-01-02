import { upload } from '../middleware/multer.js';
import { uploadImage } from '../controllers/storage-controller.js';
import express from "express";

const storageRouter = express.Router();

storageRouter.post("/upload",upload, uploadImage);

export default storageRouter