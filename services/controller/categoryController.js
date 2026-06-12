const Category = require('../Models/categoryModel')

exports.createCategory = async (req, res) => {
    console.log("inside add category");
    const { categoryName } = req.body;
    console.log(categoryName);


    try {
        const existing = await Category.findOne({ categoryName });
        if (existing) {
            res.status(409).json("Category name already exists");
        }

        else {
            const newCategory = new Category({ categoryName })
            await newCategory.save()

            res.status(200).json(newCategory);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getAllCategory = async (req, res) => {
    console.log("inside getAllCategory");


    try {
        const all = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(all);

    } catch (err) {
        res.status(500).json(err);
    }
};


exports.getCategoryById = async (req, res) => {
    const { id } = req.params
    console.log("ID RECEIVED:", id);

    try {
        const category = await Category.findById({ _id: id });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(err);
    }
}