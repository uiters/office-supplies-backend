const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/isAdmin.middleware");
const bcrypt = require("bcrypt");
const {User} = require("../mongoose/models/user.mongoose.model");

/*
 @GET: Get all user
 */

router.get("/", [auth, admin], async (req, res) => {
    let user = await User.find()
    // let user = await User.find();
    res.status(200).send({
        user,
    });
});

/*
 @GET: Get user with user's product
 */

router.get('/userproducts', auth, async (req, res) => {
    let user = await User.findById({_id: req.user._id}).populate('userProducts', 'productName product')
    res.status(200).send({
        message: 'success',
        user
    })
})


/*
@ POST: Create user
 */
router.post("/register", async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(404).send("Email already register");

    user = new User({
        email: req.body.email,
        password: req.body.password,
        profile: req.body.profile,
        phoneNumber: req.body.phoneNumber,
        isAdmin: req.body.isAdmin | false,
        status: req.body.status | 0
    });

    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        console.log(err);
    }
});

/*
@ POST: UPDATE USER
 */
router.put("/updateuser", auth, async (req, res) => {
    let newUserInfo = req.body;

    let user = await User.findOne({email: newUserInfo.email})

    if (!user) return res.status(404).send({
        message: 'User not found'
    })

    user = await User.findByIdAndUpdate(
        {_id: user._id},
        {
            email: newUserInfo.email,
            password: newUserInfo.password,
            profile: newUserInfo.profile,
            status: newUserInfo.status
        },
        {new: true}
    )

    res.status(200).send({
        message: 'user has been updated successfully',
        user
    })
})

/*
@ POST: Delete user
** MUST BE LOGGED IN WITH ADMIN ACCOUNT TO DELETE USER **
 */

router.post('/deleteuser', [auth, admin], async (req, res) => {
    let user = await User.findOneAndDelete({email: req.body.email});
    if (!user) return res.status(404).send({message: 'User not found'});
    res.send({
        message: `user with email ${user.email} has been deleted`
    });
})


module.exports = router;
