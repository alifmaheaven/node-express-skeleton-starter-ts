import multer from 'multer';

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './public/uploads/'+(_req?.body?.destination || ''));
  },
  filename: (_req, _file, cb) => {
    cb(null, Date.now() + '-' + _file?.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;
