const multer = require("multer");
const path = require("path");
const fs = require("fs")
const process = require("process");
const { create } = require("lodash");
const cwd = process.cwd();


if (!fs.existsSync("uploads/")) {
  fs.mkdirSync("uploads/")
  console.log(fs.existsSync("uploads/"));
}
const createDirIfNot = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}
const pwd = cwd.replace(/\\/g, "/");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueString =
      Date.now() + "_" + crypto.randomBytes(5).toString("hex");
    cb(null, uniqueString);
  },
});




const profile_media = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/profileMedia";
    createDirIfNot(dir);
    cb(null, "./uploads/profileMedia")
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + path.extname(file.originalname);
    cb(null, "profile_" + uniqueString);
  },
});







const categoryMedia = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/categoryMedia";
    createDirIfNot(dir);
    cb(null, "./uploads/categoryMedia")
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + path.extname(file.originalname);
    cb(null, "category_" + uniqueString);
  },
})
const subCategoryMedia = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads/subCategoryMedia";
    createDirIfNot(dir);
    cb(null, "./uploads/subCategoryMedia")
  },
  filename: (req, file, cb) => {
    const uniqueString = Date.now() + "_" + path.extname(file.originalname);
    cb(null, "subCategory_" + uniqueString);
  },
})



const productMedia=multer.diskStorage({
    destination:(req,file,cb)=>{
        const dir="./uploads/productMedia";
        createDirIfNot(dir);
        cb(null,"./uploads/productMedia")
    },
    filename:(req,file,cb)=>{
        const uniqueString=Date.now()+"_"+path.extname(file.originalname);
        cb(null,"product_"+uniqueString)
    }
})

const fileData=multer.diskStorage({
  destination:(req,file,cb)=>{
      const dir="./uploads";
      createDirIfNot(dir);
      cb(null,"./uploads")
  },
  filename:(req,file,cb)=>{
      const uniqueString=Date.now()+"_"+path.extname(file.originalname);
      cb(null,"file_"+uniqueString)
  }
})




// filter for media type
function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);

  } else {
    cb(new Error("Wrong file type"));
  }
}

const upload = multer({storage, fileFilter});

const profileUpload = multer({storage: profile_media, fileFilter, limits: {fileSize: 1024 * 1024 * 2}});
const categoryUpload = multer({storage: categoryMedia, fileFilter, limits: {fileSize: 1024 * 1024 * 2}});
const subCategoryUpload = multer({storage: subCategoryMedia, fileFilter, limits: {fileSize: 1024 * 1024 * 2}});
const productUpload=multer({storage:productMedia,fileFilter,limits:{fileSize:1024*1024*2}})
const fileUpload=multer({storage:fileData})




module.exports = {
  upload,
  categoryUpload,
  subCategoryUpload,
  productUpload,
  profileUpload,
  fileUpload
};