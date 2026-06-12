import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getSingleProductAPI,
  updateProductAPI,
} from "../Services/allAPI";

import SERVER_URL from "../Services/server_url";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    category: "",
    subCategory: "",
  });

  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // ================= GET PRODUCT =================
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await getSingleProductAPI(id);
      console.log(res);
      console.log("Product Data:", res.data);
console.log("Category:", res.data.category);
console.log("SubCategory:", res.data.subCategory);
      
setProductData({
  productName: res.data.productName,
  description: res.data.description,
  category: res.data.category?._id,
  subCategory: res.data.subCategory?._id,
});
      setVariants(res.data.variants || []);
      setExistingImages(res.data.image || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= IMAGE PREVIEW =================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages(files);

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreview(previewUrls);
  };

  // ================= UPDATE PRODUCT =================
  const handleUpdate = async () => {
    const {
      productName,
      description,
      category,
      subCategory,
    } = productData;
    console.log(productData);

    if (
      !productName ||
      !description ||
      !category ||
      !subCategory
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    const reqBody = new FormData();

    reqBody.append("productName", productName);
    reqBody.append("description", description);
    reqBody.append("category", category);
    reqBody.append("subCategory", subCategory);

    reqBody.append(
      "variants",
      JSON.stringify(variants)
    );

    if (images.length > 0) {
      images.forEach((img) => {
        reqBody.append("image", img);
      });
    }

    const token = sessionStorage.getItem("token");

    const reqHeader = {
      authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    try {
  await updateProductAPI(id, reqBody, reqHeader);

  toast.success("Product updated successfully");

  setTimeout(() => {
    navigate(`/product/${id}`);
  }, 1000);

} catch (err) {
  console.log(err);
  toast.error("Failed to update product");
}
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

        {/* HEADER */}
        <h2 className="text-3xl font-bold text-[#003F63] mb-8">
          Edit Product
        </h2>

        {/* PRODUCT NAME */}
        <div className="mb-5">
          <label className="block font-medium mb-2">
            Product Name
          </label>

          <input
            type="text"
            value={productData.productName}
            onChange={(e) =>
              setProductData({
                ...productData,
                productName: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#003F63]"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            rows="5"
            value={productData.description}
            onChange={(e) =>
              setProductData({
                ...productData,
                description: e.target.value,
              })
            }
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#003F63]"
          />
        </div>

        {/* CURRENT IMAGES */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">
            Current Images
          </h3>

          <div className="flex flex-wrap gap-4">
            {existingImages.length > 0 ? (
              existingImages.map((img, index) => (
                <img
                  key={index}
                  src={`${SERVER_URL}/uploads/${img}`}
                  alt="product"
                  className="w-28 h-28 object-cover rounded-lg border shadow-sm"
                />
              ))
            ) : (
              <p className="text-gray-500">
                No images available
              </p>
            )}
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="mb-6">
          <label className="block font-medium mb-2">
            Upload New Images
          </label>

          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* IMAGE PREVIEW */}
        {imagePreview.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">
              Image Preview
            </h3>

            <div className="flex flex-wrap gap-4">
              {imagePreview.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="preview"
                  className="w-28 h-28 object-cover rounded-lg border shadow-sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* VARIANTS */}
        <h3 className="text-xl font-bold text-[#003F63] mb-4">
          Product Variants
        </h3>

        {variants.map((variant, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 border rounded-lg p-4 mb-4"
          >
            {/* RAM */}
            <div>
              <label className="block text-sm mb-1">
                RAM
              </label>

              <input
                type="text"
                value={variant.ram}
                className="w-full border rounded-lg p-3"
                onChange={(e) => {
                  const copy = [...variants];
                  copy[index].ram = e.target.value;
                  setVariants(copy);
                }}
              />
            </div>

            {/* PRICE */}
            <div>
              <label className="block text-sm mb-1">
                Price
              </label>

              <input
                type="number"
                value={variant.price}
                className="w-full border rounded-lg p-3"
                onChange={(e) => {
                  const copy = [...variants];
                  copy[index].price = e.target.value;
                  setVariants(copy);
                }}
              />
            </div>

            {/* QUANTITY */}
            <div>
              <label className="block text-sm mb-1">
                Quantity
              </label>

              <input
                type="number"
                value={variant.quantity}
                className="w-full border rounded-lg p-3"
                onChange={(e) => {
                  const copy = [...variants];
                  copy[index].quantity = e.target.value;
                  setVariants(copy);
                }}
              />
            </div>
          </div>
        ))}

        {/* UPDATE BUTTON */}
        <div className="mt-8 text-center">
          <button
            onClick={handleUpdate}
            className="bg-[#003F63] hover:bg-[#002a42] text-white px-10 py-3 rounded-lg font-semibold transition"
          >
            Update Product
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditProduct;