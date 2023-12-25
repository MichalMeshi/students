const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET_KEY
// });

cloudinary.config({
    cloud_name: 'dk2jvq54v',
    api_key: '421225437146119',
    api_secret: 'qszJvtpuZ0dNwexppk5VNWfdfH0'
  });
  
module.exports = {cloudinary};