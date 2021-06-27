const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/File");
const { v4: uuidv4 } = require("uuid");
const { provider } = require("../services/audio");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000000 },
}).single("file");

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    const file = new File({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    // return res.json({ response });
    try {
      const engine = await provider(response.filename);
      res.json({
        file: `${response}`,
        engine,
      });
    } catch (err) {
      return res.json({ error: err.message });
    }
  });
});

module.exports = router;
