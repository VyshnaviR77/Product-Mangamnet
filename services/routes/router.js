const express=require('express')
const router=express.Router()
const jwtMiddleware=require('../middleware/jwtMiddleware')
const userController=require('../controller/userController')
const categoryController=require('../controller/categoryController')
const subCategoriesController=require('../controller/subcategoryController')
const productController=require('../controller/productController')
const multerConfig=require('../middleware/imageMulter')

const wishlistController=require('../controller/wishlistController')

// sigup
router.post('/register',userController.registerController)
router.post('/login',userController.loginController)

router.post('/add-category',jwtMiddleware,categoryController.createCategory)
router.get('/get-category',jwtMiddleware,categoryController.getAllCategory)
router.get('/getByid/:id',jwtMiddleware,categoryController.getCategoryById)


router.get('/categories', categoryController.getAllCategory);
router.get('/subcategories', subCategoriesController.getAllSubCategories);
router.get('/subcategories/:categoryId', subCategoriesController.getSubCategoriesByCategory);


router.post('/create',jwtMiddleware,subCategoriesController.createSubCategory)
router.get('/getsubcategory',jwtMiddleware,subCategoriesController.getAllSubCategories)
router.get('/getsubcategory/:categoryId',jwtMiddleware,subCategoriesController.getSubCategoriesByCategory)

router.post('/createproduct',jwtMiddleware,multerConfig.array('image', 3),productController.createProduct)
router.get('/getproducts', productController.getProducts)
router.get("/product/:id", productController.getSingleProduct);
router.put("/product/:id",jwtMiddleware,multerConfig.array("image"), productController.updateProduct);

// router.get("/products",productController.getAllProductsController);



router.post("/wishlist",jwtMiddleware,wishlistController.addToWishlist)

router.get("/allwishlist", jwtMiddleware, wishlistController.getWishlist);


router.delete("/wishlist/:productId", jwtMiddleware, wishlistController.removeFromWishlist);





module.exports=router