const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/isAdmin.middleware");
const { User } = require("../mongoose/models/user.mongoose.model");

router.get("/", [auth, admin], async (req, res) => {
    let user = await User.find();
    res.status(200).send(user);
});

router.post("/register", async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(404).send("Email already register");

    user = new User({
        email: req.body.email,
        password: req.body.password,
        profile: req.body.profile,
        phoneNumber: req.body.phoneNumber,
        isAdmin: req.body.isAdmin | false,
    });
    user.password = await user.hashPass(user);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
