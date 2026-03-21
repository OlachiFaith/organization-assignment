const multer = require('multer')

exports.upload = multer({
    storage: multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null, "./assets")
        },

        filename:function(req,file,cb){
            const uniqueSuffix = new Date().getTime()+'-'+ Math.round(Math.random() * 1e9)
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split("/")[1])
        },
    }),
    limits : {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb)=> {
        if(!file.mimetype.startsWith("image/")){
            cb(new Error ("Only image files are allowed"))
        }else{
            cb(null, true)
        }
    }
})