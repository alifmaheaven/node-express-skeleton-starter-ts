import fs from 'fs';
import multer from 'multer';

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync('./public/uploads/tmp/')){
      fs.mkdirSync('./public/uploads/tmp/');
    }
    cb(null, './public/uploads/tmp/');
  },
  filename: (_req, _file, cb) => {
    cb(null, Date.now() + '-tmp-' + _file?.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;
