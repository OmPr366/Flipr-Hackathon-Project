const express = require("express");
const { uploadimage } = require("../controllers/fileupload");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const router = express();


// Configuration
cloudinary.config({
  cloud_name: "ompra",
  api_key: "316452442986623",
  api_secret: "ol61Fq9h1aHG7C0eKUsUPeP-Kwk",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    return {
      folder: 'flipr',
      resource_type: file.mimetype.startsWith('image') ? 'image' : 'video',
      format: async (req, file) => {
        if (file.mimetype.startsWith('image')) {
          return 'jpg'; // or png, gif, etc.
        } else {
          return 'mp4'; // or mov, avi, wmv, etc.
        }
      },
      public_id: (req, file) => 'flipr_unique_id', // or use a unique ID generator
    };
  },
});

const upload = multer({ storage: storage });



router.put('/upload-image',upload.single('file'), async (req,res)=>{
    try {
        console.log(req);
        // Console form data
        console.log(req.file);
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json({
          public_id: result.public_id,
          url: result.secure_url,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          error: "Server Error",
        });
      }
});





module.exports = router;
