import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Minus,
  Plus,
  Heart,
  XCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import SERVER_URL from "../Services/server_url";
import { useNavigate } from "react-router-dom";
import {
  getSingleProductAPI,
  addToWishlistAPI,
  removeFromWishlistAPI,
} from "../Services/allAPI";

import { toast } from "react-toastify";
import { useWishlist } from "../context/WishlistContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [quantity, setQuantity] = useState(1);

  const { wishlist, fetchWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getSingleProductAPI(id);

        setProduct(res.data);

        if (res.data?.image?.length > 0) {
          setMainImage(
            `${SERVER_URL}/uploads/${res.data.image[0]}`
          );
        }

        if (res.data?.variants?.length > 0) {
          setSelectedRam(res.data.variants[0].ram);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  const isInStock = (product) => {
    return product?.variants?.some((v) => v.quantity > 0);
  };

  const handleHeartClick = async (productId) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.warning("Please login first");
      return;
    }

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    const isAlreadyLiked = wishlist?.some(
      (item) => item?.product?._id === productId
    );

    try {
      if (isAlreadyLiked) {
        await removeFromWishlistAPI(productId, reqHeader);
        toast.info("Removed from wishlist");
      } else {
        await addToWishlistAPI(productId, reqHeader);
        toast.success("Added to wishlist");
      }

      await fetchWishlist();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-10">
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          <div>
            <div className="border rounded-xl p-6 bg-white">
              <img
                src={
                  mainImage ||
                  (product?.image?.length > 0
                    ? `${SERVER_URL}/uploads/${product.image[0]}`
                    : "https://via.placeholder.com/300")
                }
                alt={product.productName}
                className="w-full h-80 object-contain"
              />
            </div>

            <div className="flex gap-3 mt-4">
              {product?.image?.map((img, index) => (
                <img
                  key={index}
                  src={`${SERVER_URL}/uploads/${img}`}
                  alt=""
                  onClick={() =>
                    setMainImage(
                      `${SERVER_URL}/uploads/${img}`
                    )
                  }
                  className="w-20 h-20 border rounded-lg object-cover cursor-pointer hover:border-[#F4A300]"
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#003F63]">
              {product.productName}
            </h1>

            <p className="text-gray-600 mt-3">
              {product.description || "No description available"}
            </p>

            <h2 className="text-3xl font-bold text-[#F4A300] mt-4">
              ₹ {product?.variants?.[0]?.price || "N/A"}
            </h2>

            <div className="flex items-center gap-2 mt-4">
              <p>Availability:</p>

              {isInStock(product) ? (
                <>
                  <CheckCircle size={18} className="text-green-500" />
                  <span className="text-green-600 font-medium">
                    In Stock
                  </span>
                </>
              ) : (
                <>
                  <XCircle size={18} className="text-red-500" />
                  <span className="text-red-600 font-medium">
                    Out of Stock
                  </span>
                </>
              )}
            </div>

            <hr className="my-6" />

            <div className="flex items-center gap-4 flex-wrap">
              <h3 className="font-semibold text-lg">RAM</h3>

              <div className="flex gap-3">
                {product?.variants?.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedRam(variant.ram)}
                    className={`px-5 py-2 border rounded-lg transition ${
                      selectedRam === variant.ram
                        ? "bg-[#F4A300] text-white border-[#F4A300]"
                        : "bg-white"
                    }`}
                  >
                    {variant.ram}
                  </button>
                ))}
              </div>
            </div>

            <hr className="my-6" />

            <h3 className="font-semibold text-lg mb-3">
              Quantity
            </h3>

            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                }
                className="w-10 h-10 border rounded-lg flex items-center justify-center"
              >
                <Minus size={16} />
              </button>

              <span className="text-lg font-semibold">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-10 h-10 border rounded-lg flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() =>
                  navigate(`/edit-product/${product._id}`)
                }
                className="bg-[#F4A300] text-white px-8 py-3 rounded-lg flex-1"
              >
                Edit Product
              </button>

              <button className="bg-[#003F63] text-white px-8 py-3 rounded-lg flex-1">
                Buy Now
              </button>

              <button
                onClick={() => handleHeartClick(product._id)}
                className="border border-red-500 text-red-500 px-4 py-3 rounded-lg flex items-center justify-center"
              >
                <Heart
                  size={22}
                  fill={
                    wishlist?.some(
                      (item) => item?.product?._id === product._id
                    )
                      ? "red"
                      : "none"
                  }
                  className={
                    wishlist?.some(
                      (item) => item?.product?._id === product._id
                    )
                      ? "text-red-500"
                      : "text-gray-500"
                  }
                />
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default ProductDetails;