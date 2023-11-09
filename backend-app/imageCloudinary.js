var express = require("express");
var router = express.Router();

const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwustzgek",
  api_key: "497382222751667",
  api_secret: "GosHkI3KZwIinrFpv7RjRzk0bsU",
});
const upload = multer({ dest: "uploads/" });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/", function (req, res, next) {
  const name = req.body.name;
  res.send({ message: name });
});

router.post("/upload", upload.single("image"), function (req, res) {
  console.log(req.file.path);
  const path = req.file.path;

  cloudinary.uploader.upload(path, function (error, result) {
    if (error) {
      console.error(error);
      return res.status(500).send("Error uploading file");
    }

    console.log(result);

    // Return the uploaded image URL to the client
    return res.send(result.url);
  });
});

module.exports = router;