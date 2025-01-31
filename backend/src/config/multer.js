import multer from 'multer'
import crypto from 'crypto'
import path from  'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/images')
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12, function (err, name){
        const fn = name.toString("hex") + path.extname(file.originalname);
        cb(null, fn);
      })
    }
  })
  
const upload = multer({
    storage:storage,
    limits: { fileSize: 10 * 1024 * 1024 }, //limit to 10mb
    fileFilter: (req, file, cb) => {
    if (!file) {
        return cb(new Error('No file provided'));
    }
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = file.originalname ? filetypes.test(path.extname(file.originalname).toLowerCase()) : false;
    const mimetype = file.mimetype ? filetypes.test(file.mimetype) : false;

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
},

})

export default upload