const { Category } = require("../mongoose/models/category.mongoose.model");
const router = require("express").Router();

router.get('/', async (req, res)=> {
    const categories = await Category.find();
    res.status(200).send({
        message: 'success',
        categories
    })
})

module.exports = router