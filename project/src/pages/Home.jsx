import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ChevronDown, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
    addSubcategoryAPI, addcategoryAPI, getallcategoryAPI, getallSubAPI, createProductAPI, getAllProductsAPI
    , addToWishlistAPI, getWishlistAPI
} from "../Services/allAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import SERVER_URL from "../Services/server_url";


function Home() {

    // selected
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);


    const IMAGE_URL = "http://localhost:5000/uploads/";
    const [modalstatus, setmodalstatus] = useState(false);
    const [categoryModal, setCategoryModal] = useState(false);
    const [subcategoryModal, setsubCategoryModal] = useState(false);
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        categoryName: ""
    })
    console.log(category);
    const [getcatgory, setgetcatgory] = useState([])
    const [subcategory, setSubCategory] = useState({
        category: "",
        subCategoryName: ""
    })
    console.log(subcategory);
    const [getsub, setgetsub] = useState([])


const toggleHeart = (productId) => {
  setLikedProducts((prev) =>
    prev.includes(productId)
      ? prev.filter((id) => id !== productId)
      : [...prev, productId]
  );

  handleHeartClick(productId);
};


    // product
    const [product, setProduct] = useState({
        productName: "",
        category: "",
        subCategory: "",
        description: "",
        variants: []
    });
    console.log(product);
    const [variant, setVariant] = useState({
        ram: "",
        price: "",
        quantity: ""
    });


    const [allProducts, setAllProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // heart
    const [likedProducts, setLikedProducts] = useState([]);
    const [wishlistCount, setWishlistCount] = useState(0);

    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        if (!product.images || product.images.length === 0) {
            setPreviewImages([]);
            return;
        }

        const urls = product.images.map((file) =>
            URL.createObjectURL(file)
        );

        setPreviewImages(urls);

        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [product.images]);

    // filtered option
    const finalProducts = allProducts.filter((product) => {
        if (search.trim()) {
            return product.productName
                .toLowerCase()
                .includes(search.toLowerCase());
        }

        if (selectedSubCategory) {
            return product.subCategory?._id === selectedSubCategory;
        }


        if (selectedCategory) {
            return product.category?._id === selectedCategory;
        }

        return true;
    });

    // get products
    const getAllProducts = async (
        pageNumber = 1,
        searchText = ""
    ) => {
        try {
            const res = await getAllProductsAPI(
                searchText,
                pageNumber
            );

            if (res.status === 200) {
                setAllProducts(res.data.products);
                setPage(res.data.currentPage);
                setTotalPages(res.data.totalPages);
            }
        } catch (err) {
            console.log(err);
        }
    };


    // add category
    const handlecatgory = async () => {
        console.log("inside category added");
        const { categoryName } = category

        const token = sessionStorage.getItem("token")
        const reqHeader = {
            'authorization': `Beare ${token}`
        }

        try {
            const result = await addcategoryAPI(category, reqHeader)
            // console.log(result);
            if (result.status == 200) {
                toast.success("Category added successfull...")
                setCategory({
                    categoryName: ""
                })
                setCategoryModal(false)
            }



        }
        catch (err) {
            console.log(err);

        }

    }


    //       all categories
    const getall = async () => {
        console.log("inisde get all category");


        const token = sessionStorage.getItem("token")
        const reqHeader = {
            'authorization': `Beare ${token}`
        }
        console.log("TOKEN:", sessionStorage.getItem("token"));
        try {
            const res = await getallcategoryAPI(reqHeader)
            console.log(res);
            if (res.status == 200) {
                setgetcatgory(res.data)
            }

        }
        catch (err) {
            console.log(err);

        }

    }

    // get sll subacteory
    const handleallsub = async (categoryId) => {
        console.log("inisde get all subcategory");
        console.log("CATEGORY ID:", categoryId);

        const token = sessionStorage.getItem("token")
        const reqHeader = {
            'authorization': `Beare ${token}`
        }
        console.log("TOKEN:", sessionStorage.getItem("token"));
        try {
            const res = await getallSubAPI(categoryId, reqHeader)
            console.log(res);
            if (res.status == 200) {
                setgetsub(res.data)
            }

        }
        catch (err) {
            console.log(err);

        }

    }

    // add subacteory
    const addSub = async () => {
        console.log("inide add subcategory");
        const { category, subCategoryName } = subcategory
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            'authorization': `Beare ${token}`
        }
        try {
            const result = await addSubcategoryAPI(subcategory, reqHeader)
            console.log(result);
            if (result.status === 201 || result.status === 200) {
                toast.success("SubCategory added...");


                setSubCategory({
                    category: "",
                    subCategoryName: ""
                });

                setsubCategoryModal(false)
            }

        }
        catch (err) {
            console.log(err);

        }

    }

    // discard
    const handleDiscard = () => {
        setSubCategory({
            category: "",
            subCategoryName: ""
        });
        setCategory({
            categoryName: ""
        })
    };



    // product creation
    const handleAddProduct = async () => {
  console.log("inside add product");

  const token = sessionStorage.getItem("token");

  const reqHeader = {
    authorization: `Beare ${token}`,
    "Content-Type": "multipart/form-data"
  };

  try {
    const formData = new FormData();

    formData.append("productName", product.productName);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("subCategory", product.subCategory);

    formData.append(
      "variants",
      JSON.stringify(product.variants || [])
    );

    if (product.images && product.images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        formData.append("image", product.images[i]);
      }
    }

    const result = await createProductAPI(formData, reqHeader);

    console.log("PRODUCT RESPONSE:", result);

    if (result?.status === 201 || result?.status === 200) {
      toast.success("Product added successfully");

      setProduct({
        productName: "",
        category: "",
        subCategory: "",
        description: "",
        variants: [],
        images: []
      });

      setVariant({
        ram: "",
        price: "",
        quantity: ""
      });

      setmodalstatus(false);
    } else {
      toast.error("Failed to add product");
    }
  } catch (err) {
    console.log("ADD PRODUCT ERROR:", err);

    toast.error(
      err?.response?.data?.message || "Something went wrong"
    );
  }
};


    // heart icon
    const handleHeartClick = async (productId) => {
        const token = sessionStorage.getItem("token");

        const reqHeader = {
            authorization: `Beare ${token}`
        };


        try {
            await addToWishlistAPI(productId, reqHeader);
            fetchWishlist()


            setLikedProducts((prev) => [...prev, productId]);

            toast.success("Added to wishlist..");
            fetchWishlist()
        } catch (err) {
            console.log(err.response?.data || err.message);

            if (err.response?.status === 409) {
                toast.info("Already in wishlist");
            }
        }
    };

    // count
    const fetchWishlist = async () => {
        try {
            const token = sessionStorage.getItem("token");

            const reqHeader = {
                authorization: `Beare ${token}`
            };

            const res = await getWishlistAPI(reqHeader);
            // console.log(res);


            setWishlistCount(res?.data?.length || 0)
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        getall();

        getAllProducts(page, search);
        fetchWishlist();
        setPage(1)

    }, [search, page])

    const handleDiscardProduct = () => {
        setProduct({
            productName: "",
            category: "",
            subCategory: "",
            description: "",
            variants: [],
            images: []
        });

        setVariant({
            ram: "",
            price: "",
            quantity: ""
        });

        setmodalstatus(false);
    };
    return (
        <>
            <div>
                <Navbar search={search}
                    setSearch={setSearch} wishlistCount={wishlistCount} />

                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row gap-6">


                        <div className="w-full lg:w-72 shrink-0">
                            <Sidebar
                                onSelectCategory={(catId) => {
                                    setSelectedCategory(catId);
                                    handleallsub(catId);
                                }}
                                onSelectSubCategory={setSelectedSubCategory}
                            />
                        </div>

                        {/* Products Section */}
                        <div className="flex-1 min-w-0">

                            {/* Top Buttons */}
                            <div className="flex flex-wrap justify-start lg:justify-end gap-3 mb-6">

                                <button onClick={() => setCategoryModal(true)} className="bg-[#F4A300] text-white px-4 py-2 rounded-md text-sm hover:bg-[#dc9300]">
                                    Add Category
                                </button>

                                <button onClick={() => setsubCategoryModal(true)} className="bg-[#F4A300] text-white px-4 py-2 rounded-md text-sm hover:bg-[#dc9300]">
                                    Add Sub Category
                                </button>

                                <button onClick={() => setmodalstatus(true)} className="bg-[#F4A300] text-white px-4 py-2 rounded-md text-sm hover:bg-[#dc9300]">
                                    Add Product
                                </button>
                            </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {finalProducts.map((product) => (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      key={product._id}
      className="bg-white shadow rounded-lg p-4 cursor-pointer relative"
    >
     
      <button
  onClick={(e) => {
    e.stopPropagation();
    toggleHeart(product._id);
  }}
  className="absolute top-3 right-3"
>
  <Heart
    size={20}
    fill={
      likedProducts.includes(product._id)
        ? "red"
        : "none"
    }
    className={
      likedProducts.includes(product._id)
        ? "text-red-500"
        : "text-gray-400"
    }
  />
</button>
      <img
        src={`${SERVER_URL}/uploads/${product.image[0]}`}
        alt=""
        className="w-full h-48 object-cover rounded"
      />

      <h3 className="font-semibold mt-3">
        {product.productName}
      </h3>

      <p className="text-gray-500 text-sm">
        {product.category?.categoryName}
      </p>

      <p className="text-[#F4A300] font-bold mt-2">
        ₹{" "}
        {product.variants && product.variants.length > 0
          ? product.variants[0].price
          : "No Price"}
      </p>
    </div>
  ))}
</div>
                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-3 mt-8">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Prev
                                </button>

                                <span>
                                    Page {page} of {totalPages}
                                </span>

                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage(page + 1)}
                                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                {modalstatus && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setmodalstatus(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-5xl rounded-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center border-b pb-4">
                                <h2 className="text-2xl font-semibold text-[#003F63]">
                                    Add Product
                                </h2>

                                <button
                                    onClick={() => setmodalstatus(false)}
                                    className="text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="mt-6 space-y-6">

                                {/* Title */}
                                <div className="grid md:grid-cols-4 gap-4 items-center">
                                    <label className="font-medium">
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter Product Name"
                                        className="md:col-span-3 border rounded-lg p-3"
                                        value={product.productName}
                                        onChange={(e) =>
                                            setProduct({ ...product, productName: e.target.value })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="font-medium block mb-4">
                                        Variants
                                    </label>

                                    {/* HEADER */}
                                    <div className="grid grid-cols-3 gap-4 mb-2 font-medium">
                                        <p>RAM</p>
                                        <p>Price</p>
                                        <p>Quantity</p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-3">
                                        <input
                                            type="text"
                                            placeholder="4GB"
                                            className="border rounded-lg p-3"
                                            value={variant.ram}
                                            onChange={(e) =>
                                                setVariant({ ...variant, ram: e.target.value })
                                            }
                                        />

                                        <input
                                            type="number"
                                            placeholder="500"
                                            className="border rounded-lg p-3"
                                            value={variant.price}
                                            onChange={(e) =>
                                                setVariant({ ...variant, price: e.target.value })
                                            }
                                        />

                                        <input
                                            type="number"
                                            placeholder="10"
                                            className="border rounded-lg p-3"
                                            value={variant.quantity}
                                            onChange={(e) =>
                                                setVariant({ ...variant, quantity: e.target.value })
                                            }
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => {

                                                if (!variant.ram || !variant.price || !variant.quantity) return;

                                                setProduct({
                                                    ...product,
                                                    variants: [...product.variants, variant]
                                                });

                                                setVariant({ ram: "", price: "", quantity: "" });
                                            }}
                                            className="bg-[#F4A300] text-white px-5 py-2 rounded-lg"
                                        >
                                            + Add Variant
                                        </button>
                                    </div>

                                    {product.variants.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            {product.variants.map((v, index) => (
                                                <div
                                                    key={index}
                                                    className="border rounded-lg p-3 shadow-sm bg-white w-40"
                                                >
                                                    <p className="text-sm font-medium">RAM: {v.ram}</p>
                                                    <p className="text-sm">Price: {v.price}</p>
                                                    <p className="text-sm">Qty: {v.quantity}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block font-medium mb-2">
                                        Category Name
                                    </label>

                                    <select
                                        className="w-full border rounded-lg p-3"
                                        onChange={(e) => {
                                            const categoryId = e.target.value;

                                            setProduct({
                                                ...product,
                                                category: categoryId,
                                                subCategory: ""
                                            });

                                            handleallsub(categoryId);
                                        }}
                                    >
                                        <option>Select Category</option>

                                        {getcatgory.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div className="grid md:grid-cols-4 gap-4 items-center">
                                    <label className="font-medium">
                                        Sub Category
                                    </label>

                                    <select
                                        className="w-full border rounded-lg p-3"
                                        onChange={(e) =>
                                            setProduct({
                                                ...product,
                                                subCategory: e.target.value
                                            })
                                        }
                                    >
                                        <option>Select Sub Category</option>

                                        {getsub.map((sub) => (
                                            <option key={sub._id} value={sub._id}>
                                                {sub.subCategoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                                <div className="grid md:grid-cols-4 gap-4 items-center">
                                    <label className="font-medium">
                                        Description
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Enter Product Description"
                                        className="md:col-span-3 border rounded-lg p-3"
                                        value={product.description}
                                        onChange={(e) =>
                                            setProduct({ ...product, description: e.target.value })
                                        }
                                    />
                                </div>


                                <div className="grid md:grid-cols-4 gap-4">
                                    <label className="font-medium">
                                        Upload Images
                                    </label>

                                    <div className="md:col-span-3">

                                        <input
                                            type="file"
                                            multiple
                                            className="w-full border rounded-lg p-3"
                                            onChange={(e) => {
                                                const newFiles = Array.from(e.target.files);

                                                setProduct((prev) => ({
                                                    ...prev,
                                                    images: [...(prev.images || []), ...newFiles]
                                                }));
                                            }}
                                        />

                                        <div className="flex flex-wrap gap-4 mt-4">
                                            {previewImages.length > 0 ? (
                                                previewImages.map((img, index) => (
                                                    <img
                                                        key={index}
                                                        src={img}
                                                        alt="preview"
                                                        className="w-24 h-24 object-cover border rounded-lg"
                                                    />
                                                ))
                                            ) : (
                                                <>
                                                    <div className="w-24 h-24 border rounded-lg flex items-center justify-center text-gray-400">
                                                        Image
                                                    </div>
                                                    <div className="w-24 h-24 border rounded-lg flex items-center justify-center text-gray-400">
                                                        Image
                                                    </div>
                                                    <div className="w-24 h-24 border rounded-lg flex items-center justify-center text-gray-400">
                                                        Image
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex justify-end gap-4 border-t pt-5">

                                    <button
                                        onClick={(e) => handleDiscardProduct(e)}
                                        className="border px-6 py-2 rounded-lg hover:bg-gray-100"
                                    >
                                        Discard
                                    </button>

                                    <button onClick={(e) => handleAddProduct(e)} className="bg-[#F4A300] text-white px-6 py-2 rounded-lg hover:bg-[#dc9300]">
                                        Add Product
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                )}


                {categoryModal && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setCategoryModal(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-md rounded-xl shadow-lg p-6"
                        >
                            <div className="flex justify-between items-center border-b px-6 py-4">
                                <h2 className="text-2xl font-semibold text-[#003F63]">
                                    Add Category
                                </h2>

                                <button
                                    onClick={() => setCategoryModal(false)}
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <X size={22} />
                                </button>
                            </div>


                            <div className="mb-6">
                                <label className="block font-medium mb-2">
                                    Category Name
                                </label>

                                <input onChange={(e) => setCategory({ ...category, categoryName: e.target.value })}
                                    value={category.categoryName}
                                    type="text"
                                    placeholder="Enter Category Name"
                                    className="w-full border rounded-lg p-3 outline-none focus:border-[#F4A300]"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={(e) => handleDiscard(e)}
                                    className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100"
                                >
                                    Discard
                                </button>

                                <button onClick={(e) => handlecatgory(e)}
                                    className="bg-[#F4A300] text-white px-5 py-2 rounded-lg hover:bg-[#dc9300]">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {subcategoryModal && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={() => setsubCategoryModal(false)}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-[#003F63]">
                                    Add Sub Category
                                </h2>

                                <button
                                    onClick={() => setsubCategoryModal(false)}
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <X size={22} />
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="block font-medium mb-2">
                                        Category Name
                                    </label>
                                    <select
                                        name="category" onChange={(e) => {
                                            setSubCategory({
                                                ...subcategory,
                                                category: e.target.value
                                            });

                                            handleallsub(e.target.value);
                                        }}
                                        className="w-full border rounded-lg p-3"
                                    >
                                        <option value="">Select Category</option>

                                        {getcatgory.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat.categoryName}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                {/* Sub Category Input */}
                                <div>
                                    <label className="block font-medium mb-2">
                                        Sub Category Name
                                    </label>

                                    <input onChange={(e) => setSubCategory({ ...subcategory, subCategoryName: e.target.value })}
                                        value={subcategory.subCategoryName} type="text"
                                        placeholder="Enter Sub Category Name"
                                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#F4A300]"
                                    />
                                </div>

                            </div>


                            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                                <button
                                    onClick={(e) => handleDiscard(e)}
                                    className="w-full sm:w-auto border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100"
                                >
                                    Discard
                                </button>

                                <button onClick={(e) => addSub(e)} className="w-full sm:w-auto bg-[#F4A300] text-white px-5 py-2 rounded-lg hover:bg-[#dc9300]">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;