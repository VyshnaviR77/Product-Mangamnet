const Category = require('../Models/categoryModel')
const SubCategory = require('../Models/subcategoryModel')

exports.createSubCategory = async (req, res) => {

    const { category, subCategoryName } = req.body;
    console.log("inside createSubCategory");

    try {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(404).json("Category not found");
        }
        const existing = await SubCategory.findOne({
            subCategoryName,
            category,
        });

        if (existing) {
            return res.status(409).json("SubCategory already exists");
        }

        const subCategory = new SubCategory({ category, subCategoryName });

        await subCategory.save();

        res.status(201).json(subCategory);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// GET  SubCategories
exports.getAllSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate("category").sort({ createdAt: -1 });

        res.status(200).json(subCategories);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

// GET SubCategories by Category
exports.getSubCategoriesByCategory = async (req, res) => {
    console.log("inside getSubCategoriesByCategory ");
    
    const {categoryId}=req.params


    try {
        const subCategories = await SubCategory.find({category: categoryId,}).populate("category");

        res.status(200).json(subCategories);
    } catch (err) {
        res.status(500).json(err.message);
    }
};