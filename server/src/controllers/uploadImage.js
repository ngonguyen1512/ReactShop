import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 } // Giới hạn file size: 5MB
});

export const uploadImage = (req, res) => {
    upload.single('file')(req, res, function (err) {
        if (err)
            return res.status(400).json({ error: 'Error uploading file' });
        // Xử lý logic upload file
        return res.status(200).json({ message: 'File uploaded successfully' });
    });
};

