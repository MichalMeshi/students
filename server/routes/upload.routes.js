const express = require('express');
const router = express.Router();
const {decodeToken } = require('../utils/jwt');
const authMiddleware = require('../middlewares/auth')
const upload = require("../middlewares/multer");
const { cloudinary } = require("../utils/cloudinary");
const { Summary } = require('../models/summary.models')


router.post('/url/:courseId',authMiddleware.auth,(req,res,next)=>{
    const token = req.headers["authorization"]; // Assuming you're using a library like cookie-parser to parse cookies
  if (!token) return next(new AppError(401, "Please login"));
  const payload = decodeToken(token);
  const id = payload._doc.id;
  const {courseId}=req.params;
    try{
  const{body}=req;
  const newSummary = new Summary({ url: body.url, title:body.title, description:body.description, userId: id, courseId: courseId ,downloadsAmount:0});
  newSummary.save();
  res.json(newSummary);
  }
  catch(err){
    res.send(err);
  }
})

router.post('/', upload.single('file') ,function (req, res) {
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

router.get('/:courseId',authMiddleware.auth, async (req, res, next) => {
const {courseId}=req.params;
const userConnectedId = req.user.id;
  try {
    const summaies = await Summary.find({courseId})
    res.json({summeries:summaies,userConnectedId:userConnectedId});
  }
  catch (error) {
    next(error);
  }
});





router.put('/:summaryId', async (req, res, next) => {
  const {summaryId}=req.params;
  const {body}=req;
    try {

      const summery = await Summary.updateOne({_id:summaryId},{$set:{downloadsAmount:body.downloadsAmount}})
      res.json(summery);
    }
    catch (error) {
      next(error);
    }
  });
  

router.delete('/:summaryId', async (req, res, next) => {
  const {summaryId}=req.params;
    try {

      const summery = await Summary.deleteOne({_id:summaryId})
      res.json(summery);
    }
    catch (error) {
      next(error);
    }
  });
  
module.exports = router;