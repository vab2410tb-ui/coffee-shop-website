// src/app/controllers/admin/upload.controller.js
import { v2 as cloudinary } from 'cloudinary';

const uploadImgController = {
    Upload: async (req, res) => {
        try {
            // 1. Kiểm tra multer đã bắt được file 
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            const { type } = req.body;
            const targetFolder = type === 'detail'
                ? 'nab_coffee/products/details'
                : 'nab_coffee/products/main';

            // 2. Upload file từ Buffer (vì dùng MemoryStorage)
            const uploadFromBuffer = (fileBuffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: targetFolder,
                            upload_preset: 'nab_coffee_upload',
                            allowed_formats: ['png', 'jpeg', 'jpg', 'svg', 'webp'],
                        },
                        (error, result) => {
                            if (result) resolve(result);
                            else reject(error);
                        }
                    );
                    stream.end(fileBuffer);
                });
            };

            const result = await uploadFromBuffer(req.file.buffer);

            return res.status(200).json({
                message: "Upload thành công!",
                url: result.secure_url,
                public_id: result.public_id
            });

        } catch (err) {
            console.error("error upload:", err);
            return res.status(500).json({
                message: "Upload fail",
                error: err.message
            });
        }
    }
};

export default uploadImgController;