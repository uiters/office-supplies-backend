const { Category } = require("../mongoose/models/category.mongoose.model");
const router = require("express").Router();

router.get("/", async (req, res) => {
    const categories = await Category.find();
    res.status(200).send({
        message: "success",
        categories,
    });
});

/*
@ POST: Create category & subcategory
 */

router.post("/", async (req, res) => {
    let category = await Category.findOne({
        categoryName: req.body.categoryName.toLowerCase(),
    });
    if (category)
        return res.status(406).send({
            message: "category already exist",
        });

    category = new Category({
        categoryName: req.body.categoryName.toLowerCase(),
        subCategory: req.body.subCategory,
    });

    try {
        await category.save();
        res.status(201).send({
            message: "success",
            category,
        });
    } catch (err) {
        console.log(err);
    }
});

/*
@ PUT: Update subcategory
 */

router.put("/updatecategory", async (req, res) => {
    let category = await Category.findOne({
        categoryName: req.body.categoryName.toLowerCase(),
    });
    let newSubCategory = [...category.subCategory, ...req.body.subCategory];
    let result = {};

    if (!category)
        return res.status(404).send({
            message: "category not found",
        });

    for (let category of newSubCategory) {
        if (!result.hasOwnProperty(category)) {
            result[category] = category;
        }
    }

    newSubCategory = Object.values(result);

    category = await Category.findByIdAndUpdate(
        { _id: category._id },
        {
            categoryName: req.body.categoryName.toLowerCase(),
            subCategory: newSubCategory,
        }
    );

    res.status(200).send({
        message: "subCategory has been updated",
        category,
    });
});

/*
@ PUT: delete 1 subcategory
 */
router.put("/deletecategory", async (req, res) => {
    let category = await Category.findOne({
        categoryName: req.body.categoryName.toLowerCase(),
    });

    if (!category)
        return res.status(404).send({
            message: "category not found",
        });

    const newSubCategory = category.subCategory.filter(
        (cate) => cate !== req.body.subCategory
    );

    category = await Category.findByIdAndUpdate(
        { _id: category._id },
        {
            categoryName: req.body.categoryName.toLowerCase(),
            subCategory: newSubCategory,
        },
        (err, res) => {
            console.log(res);
        }
    );
    try {
        res.status(200).send({
            message: `${req.body.subCategory} has been deleted`,
            category,
        });
    } catch (err) {
        console.log(err);
    }
});

/*
@ DELETE: Delete category
 */

router.put("/", async (req, res) => {
    let category = await Category.findOneAndDelete({
        categoryName: req.body.categoryName.toLowerCase(),
    });
    if (!category)
        return res.status(404).send({
            message: "category not found",
        });
    res.status(200).send({
        message: `${req.body.categoryName} has been deleted`,
        category,
    });
});

module.exports = router;
