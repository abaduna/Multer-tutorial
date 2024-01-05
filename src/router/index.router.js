const { Router } = require("express");
const path = require("path")
const router = Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
});
//Routes
router.get("/", (req, res) => {
  res.render("index"); // Make sure it matches the actual file name, e.g., "index.ejs"
});
const multerMidelware = multer({
  storage: storage,
  dest: path.join(__dirname, "public/uploads"),
}).single("image");
router.post("/upload", multerMidelware,(req, res) => {
  console.log(req.file);
  res.send("upload");
});

module.exports = router;
