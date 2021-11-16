const express = require("express");

const router = express.Router();

const Gallary = require("../models/gallary.model");

const upload = require("../middleware/fileupload");

router.get("", async (req, res) => {
  try {
    const gallary = await Gallary.find().lean().exec();
    return res.send(gallary);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});


router.post("", upload.array("pics", 5), async (req, res) => {
  try {
    const files = req.files.map((file) => file.path);
    const gallary = await Gallary.create({
      user_id: req.body.user_id,
      pictures: files,
    });
    return res.status(201).send({ gallary });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

//fs.unlinkSync(req.file.path);

// fs.unlinkSync("./public/images/uploads/"+req.file.filename, (err) => {
//   if (err) {
//       console.log("failed to delete local image:"+err);
//   } else {
//       console.log('successfully deleted local image');
//   }
// });

module.exports = router;
