const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer");
const { cloudinary } = require("../utils/cloudinary");
const { Summary } = require('../models/summary.models')
router.post('/url/:courseId',(req,res,next)=>{
  const {courseId}=req.params;
    try{
  const{body}=req;
  const newSummary = new Summary({ url: body.url, userId: 0, courseId: courseId });
  newSummary.save();
  res.json(newSummary);
  }
  catch(err){
    res.send(err);
  }
})


router.post('/', upload.single('file'), function (req, res) {
  try{
  cloudinary.uploader.upload(req.file.path, async (err, result) => {
    console.log();
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error"
      })
    }
    res.json(result);
  
  })
  
}catch(err){
res.send(err);
}
});

router.get('/:courseId', async (req, res, next) => {
const {courseId}=req.params;
  try {
    const summaies = await Summary.find({courseId})
    res.json(summaies);
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;