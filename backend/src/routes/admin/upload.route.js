import express from 'express';
import multer from 'multer';
import uploadController from '../../app/controllers/admin/upload.controller.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/upload', upload.single('image'), uploadController.Upload);

export default router;