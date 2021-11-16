const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const Gallary = require("../models/gallary.model");

const upload = require("../middleware/fileupload");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    return res.send(users);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.post("/", upload.single("pic"), async (req, res) => {
  try {
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });
    return res.status(201).send({ user });
  } catch (err) {
    return res.status(400).send(err.message);
  }
});


router.get("/:id", async function (req, res)
{
  try{
    const gallary = await Gallary.find({ user_id: req.params.id }).lean().exec();
    const user = await User.findById(req.params.id);

    return res.status(201).send({User:user, Gallary:gallary});

  }catch(err){
    return res.status(400).send(err.message);
  }
});

router.patch("/:id", async function (req, res)
{
  try{
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
  return res.status(201).json({User : user});
}catch(err){
  return res.status(400).send(err.message);
}
});


router.delete("/:id", async function (req, res)
{
  try{
  const user = await User.findByIdAndDelete(req.params.id).lean().exec();

  const filee=(user["profile_pic"]);

  const gallary = await Gallary.findOneAndDelete({ user_id: req.params.id }).lean().exec();



  // gallary.forEach((el)=>{
  //     for(let i=0;i<el["pictures"].length;i++){
  //       fs.unlink(""+el["pictures"][i]);
  //     }
  // });
 
  //   fs.unlink(""+filee, (err) => {
  //   if (err) {
  //       return res.status(201).json("failed to delete local image:"+err);
  //   } else {
  //       return res.status(201).json(`successfully deleted user his gallary & local image: ${filee}`);
  //   }
  // });

  
}catch(err){

  return res.status(400).send(err.message);
}
});




// router.delete("/:id", async function (req, res)
// {
//   try{
//   const user = await User.findByIdAndDelete(req.params.id).lean().exec();

//   const filee=(user["profile_pic"]);

//   const gallary = await Gallary.findOneAndDelete({ user_id: req.params.id }).lean().exec();

//   fs.unlink(""+filee, (err) => {
//     if (err) {
//         return res.status(201).json("failed to delete local image:"+err);
//     } else {
//         return res.status(201).json(`successfully deleted user his gallary & local image: ${filee}`);
//     }
//   });
// }catch(err){

//   return res.status(400).send(err.message);
// }
// });


module.exports = router;