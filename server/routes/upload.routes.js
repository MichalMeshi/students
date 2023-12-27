const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer");
const {cloudinary} = require("../utils/cloudinary");


router.post('/', upload.single('file'), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result){

    if(err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error"
      })
    }

    res.status(200).json({
      success: true,
      message:"Uploaded!",
      data: result
    })
  })
});


router.get('/', function (req, res) {
  // Your logic for handling GET requests goes here
  res.status(200).json({
    success: true,
    message: "GET request received successfully",
    data: {}  // You can include additional data if needed
  });
});

module.exports = router;