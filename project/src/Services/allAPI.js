import SERVER_URL from "./server_url";
import commanAPI from "./common_api";

export const registerAPI = async (reqBody) => {
    return await commanAPI("POST", `${SERVER_URL}/register`, reqBody)
}
export const loginAPI = async (reqBody) => {
    return await commanAPI("POST", `${SERVER_URL}/login`, reqBody)
}


// PUBLIC CATEGORY API
export const getPublicCategoriesAPI = async () => {
  return await commanAPI(
    "GET",
    `${SERVER_URL}/categories`
  );
};

export const getPublicSubCategoriesAPI = async () => {
  return await commanAPI(
    "GET",
    `${SERVER_URL}/subcategories`
  );
};

// PUBLIC SUBCATEGORY BY CATEGORY
export const getPublicSubByCategoryAPI = async (categoryId) => {
  return await commanAPI(
    "GET",
    `${SERVER_URL}/subcategories/${categoryId}`
  );
};





export const addcategoryAPI = async (reqBody, reqHeader) => {
    return await commanAPI("POST", `${SERVER_URL}/add-category`, reqBody, reqHeader)
}
export const getallcategoryAPI = async (reqHeader) => {
    return await commanAPI("GET", `${SERVER_URL}/get-category`,"",reqHeader)
}


export const addSubcategoryAPI = async (reqBody, reqHeader) => {
    return await commanAPI("POST", `${SERVER_URL}/create`, reqBody, reqHeader)
}

export const getallSubAPI = async (categoryId,reqHeader) => {
    return await commanAPI("GET", `${SERVER_URL}/getsubcategory/${categoryId}`,"",reqHeader)
}

export const createProductAPI = async (reqBody, reqHeader) => {
    return await commanAPI("POST", `${SERVER_URL}/createproduct`, reqBody, reqHeader)
}

export const getAllProductsAPI = async (
  search = "",
  page = 1
) => {
  return await commanAPI(
    "GET",
    `${SERVER_URL}/getproducts?search=${search}&page=${page}&limit=8`
  );
};
export const addToWishlistAPI = async (productId, reqHeader) => {
  return await commanAPI("POST",`${SERVER_URL}/wishlist`,{productId},reqHeader);
};

export const getWishlistAPI = async (reqHeader) => {
  return await commanAPI("GET",`${SERVER_URL}/allwishlist`,"",reqHeader);
};

export const getSingleProductAPI = async (id, reqHeader) => {
  return await commanAPI("GET",`${SERVER_URL}/product/${id}`,"",reqHeader);
};


export const removeFromWishlistAPI = async (productId, reqHeader) => {
  return await commanAPI("DELETE",`${SERVER_URL}/wishlist/${productId}`,"",reqHeader);
};

export const updateProductAPI = (
  id,
  reqBody,
  reqHeader
) => {
  return commanAPI(
    "PUT",
    `${SERVER_URL}/product/${id}`,
    reqBody,
    reqHeader
  );
};