const { User } = require('../mongoose/models/user.mongoose.model');

const router = require('express').Router();

router.post('/login', async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(404).send('Invalid email!')

    const isCorrectPass = await user.comparePass(req.body.password, user.password);
    if(!isCorrectPass) return res.status(404).send('Invalid password!')

    const token = user.createToken();

    res.send(`bearer ${token}`);
})

module.exports = router