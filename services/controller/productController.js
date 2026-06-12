const Product = require('../Models/productModel')
const Category = require('../Models/categoryModel')
const SubCategory = require('../Models/subcategoryModel')


exports.createProduct = async (req, res) => {
  console.log("inside create product");

  try {
    const { productName, description, category, subCategory, variants, } = req.body;

    let parsedVariants = variants;

    if (typeof parsedVariants === "string") {
      parsedVariants = JSON.parse(parsedVariants);
    }


    const image = req.files
      ? req.files.map(file => file.filename)
      : [];


    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json("Category not found");
    }


    const subCategoryExists = await SubCategory.findById(subCategory);
    if (!subCategoryExists) {
      return res.status(404).json("SubCategory not found");
    }


    const newProduct = new Product({ productName, description, category, subCategory, image, variants: parsedVariants });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });

  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
const search = req.query.search ? req.query.search.trim() : "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const filter = {};

    if (search.trim()) {
      filter.$or = [
        {
          productName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(filter)
      .populate("category")
      .populate("subCategory")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getAllProductsController = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subCategory");

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate("category")
      .populate("subCategory");

    if (!product) {
      return res.status(404).json("Product not found");
    }

    res.status(200).json(product);

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};


exports.updateProduct = async (req, res) => {
  console.log("inside updateProduct");

  const { id } = req.params;

  const {
    productName,
    description,
    category,
    subCategory,
    variants,
  } = req.body;

  try {
    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json("Product not found");
    }

    let uploadedImages = existingProduct.image;

    if (req.files && req.files.length > 0) {
      uploadedImages = req.files.map(
        (file) => file.filename
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        productName,
        description,
        category,
        subCategory,
        variants: JSON.parse(variants),
        image: uploadedImages,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};