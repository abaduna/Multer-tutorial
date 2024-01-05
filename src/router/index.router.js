const { Router } = require("express");
const path = require("path")
const uuid = require("uuid/v4")
const router = Router();

const multer = require("multer");



const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cd) => {
    cd(null, uuid() + path.extname(file.originalname));
  },
  
});
//Routes
router.get("/", (req, res) => {
  res.render("index"); // Make sure it matches the actual file name, e.g., "index.ejs"
});
const multerMidelware = multer({
  storage: storage,
  dest: path.join(__dirname, "public/uploads"),
  limits:{
    fileSize:100000000
  },
  fileFilter:(req,fild,cb)=>{
    //filtrar que solo se suba imagenes
   const filetypes = /jpeg|jpg|png|gif/;
   const mimetype = filetypes.test(file.mimetype)
   const extname = filetypes.test(path.extname(file.originalname))
   if(mimetype && extname){
    return cb(null,true)
   }
   cb("error: archivo de ser una imagen valida")
  }

}).single("image");
router.post("/upload", multerMidelware,(req, res) => {
  console.log(req.file);
  res.send("upload");
});

module.exports = router;
