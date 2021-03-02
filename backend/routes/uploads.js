import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb("Images only!");
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
    fileFilter: fileFilter,
  },
});

router.post("/", upload.single("image"), (req, res, next) => {
  res.send(`/${req.file.path}`);
});

export default router;
