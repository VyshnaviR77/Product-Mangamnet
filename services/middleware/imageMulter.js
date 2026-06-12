const multer=require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        
        cb(null, ('./uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, (`Image-${Date.now()}-${file.originalname}`))
    }

})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
        cb(null, true)

    }
    else {
cb(new Error("Accept only png, jpg or jpeg file"), false);
    }
}

const multerConfig = multer({ storage, fileFilter })
module.exports = multerConfig