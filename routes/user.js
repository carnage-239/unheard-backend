const express = require("express");
const passport = require("passport");
const authenticate = require("../middleware/auth");
const router = express.Router();
const User = require("./../models/User");

router.post("/signup", (req, res) => {
  User.register(
    new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({
            success: true,
            status: "Registration Successful!",
            data: { name: req.body.name, email: req.body.email },
          });
        });
      }
    }
  );
});

router.post("/login", (req, res) => {
  passport.authenticate("local", function (err, user, info) {
    if (!user) {
      return res.json({ err: info.message });
    }
    const token = authenticate.getToken({ id: user.id });
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");
    return res.json({
      success: true,
      token: token,
      status: "Login successful",
    });
  })(req, res);
});

router.post("/add-song", async (req, res) => {
  const { email, song } = req.body;
  console.log({ email, song });
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return res.json({ err: "User does not exist" });
  }
  await user.songs.push(song);
  await user.save();
  return res.json({ user, song });
});

module.exports = router;
