

const router = require("express").Router();

const message = require('../constants/response.const')
const responseService = require('../services/response.service')
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/isAdmin.middleware");
const {User} = require("../mongoose/models/user.mongoose.model");

/*
 @GET: Get all user
 */

router.get("/", [auth, admin], async (req, res) => {
    let user = await User.find()
    // let user = await User.find();
    // res.status(200).send({
    //     user,
    // });
    responseService(res,200, message.SUCCESS, user)
});

/*
 @GET: Get current user
 */

router.get("/me", auth, async (req, res) => {
    let userId = req.user;
    let user = await User.findById({_id: userId._id}).populate('userProducts');
    responseService(res,200, 'success', user);
})

/*
 @GET: Get user with user's product
 */

router.get('/userproducts', auth, async (req, res) => {
    let user = await User.findById({_id: req.user._id}).populate('userProducts', 'productName product')
    responseService(res,200, 'success', user);
})


/*
@ POST: Create user
 */
router.post("/register", async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    // if (user) return res.status(404).send("Email already register");
    if (user) return responseService(res,406, message.EXISTED)

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
        // res.status(201).send(user);
        responseService(res,201, message.CREATED, user)
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

    // if (!user) return res.status(404).send({
    //     message: 'User not found'
    // })
    if (!user) return responseService(res,404, message.NOT_FOUND);

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

    // res.status(200).send({
    //     message: 'user has been updated successfully',
    //     user
    // })
    responseService(res,200, message.UPDATED, user)
})

/*
@ PUT: Delete user
** MUST BE LOGGED IN WITH ADMIN ACCOUNT TO DELETE USER **
 */

router.put('/deleteuser', [auth, admin], async (req, res) => {
    let user = await User.findOneAndDelete({email: req.body.email}).exec(err => {
        if (err)
            responseService(res, 500, err)
    });
    if (!user) return responseService(404, message.NOT_FOUND)
    responseService(res,200, message.DELETED, user)
})


module.exports = router;
