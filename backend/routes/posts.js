const express = require("express");
const multer = require("multer");

const checkAuth = require ("../middleware/check-auth");

const postController = require("../controllers/posts");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext); // here renamed picture in case needed
  }
});

// Applying to try to callback image on the request body
router.post(
  "",
  checkAuth, // This is to see if you have access to post or not
  multer({ storage: storage }).single("image"), postController.postCreate);

router.put("/:id",
  checkAuth,
  multer({ storage: storage }).single('image'), postController.postUpdate);

router.get("", postController.fetchingPosts);

router.get("/:id", postController.postFindId);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;
