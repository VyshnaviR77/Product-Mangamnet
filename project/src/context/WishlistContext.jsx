import { createContext, useContext, useState, useEffect } from "react";
import { getWishlistAPI } from "../Services/allAPI";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) return;

    const reqHeader = {
      authorization: `Bearer ${token}`,
    };

    try {
      const res = await getWishlistAPI(reqHeader);
      setWishlist(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);