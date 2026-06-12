const Wishlist=require('../Models/wishlistModel')
const Product=require('../Models/productModel')
const User  = require('../Models/userModel')


exports.addToWishlist = async (req, res) => {
  console.log("inside addToWishlist");

  const email = req.payload;
  const { productId } = req.body;

  try {
    
    const userData = await User .findOne({ email });

    if (!userData) {
      return res.status(404).json("User not found");
    }

    const userId = userData._id;

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json("Product not found");
    }

    const existing = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (existing) {
      return res.status(409).json("Already in wishlist");
    }

    const wishlist = await Wishlist.create({
      user: userId,
      product: productId,
    });

    res.status(201).json(wishlist);

  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const email = req.payload;

    if (!email) return res.status(401).json("Unauthorized");

    const userData = await User.findOne({ email });

    if (!userData) return res.status(404).json("User not found");

    const wishlist = await Wishlist.find({ user: userData._id })
      .populate("product");

    res.status(200).json(wishlist);

  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};


exports.removeFromWishlist = async (req, res) => {
 try {
    const email = req.payload;
    const { productId } = req.params;

    const userData = await User.findOne({ email });

    await Wishlist.findOneAndDelete({
      user: userData._id,
      product: productId,
    });

    res.status(200).json("Removed");
  } catch (err) {
    res.status(500).json(err.message);
  }
};