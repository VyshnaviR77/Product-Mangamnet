import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useWishlist } from "../context/WishlistContext";
import CartSidebar from "./CartSidebar";

function Navbar({ search, setSearch }) {

const { wishlist, fetchWishlist } = useWishlist();
const [cartOpen, setCartOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [username, setusername] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const Token = sessionStorage.getItem("token");
      setToken(Token);

      const user = JSON.parse(sessionStorage.getItem("user"));
      setusername(user?.name);
    }
  }, []);

  const logout = () => {
    toast.success("Logout successful... please login");
    sessionStorage.clear();
    setToken("");
    setusername("");
    navigate("/");
  };
const openCart = async () => {
  await fetchWishlist();
  setCartOpen(true);
};
  return (
    <nav className="bg-[#003F63] text-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* SEARCH */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-10">
          <input
            value={search}
  onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search anything"
            className="w-full h-10 px-4 text-black bg-white rounded-l-full outline-none"
          />

          <button className="h-10 px-6 bg-[#F4A300] rounded-r-full">
            Search
          </button>
        </div>

       
        <div className="hidden md:flex items-center gap-6">

          {!token ? (
            <Link to="/register">
              <button className="flex items-center gap-1 hover:text-[#F4A300]">
                <User size={16} />
                Sign In
              </button>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 hover:text-[#F4A300]"
              >
                <div className="w-8 h-8 rounded-full bg-[#F4A300] flex items-center justify-center">
                  {username?.charAt(0).toUpperCase()}
                </div>

                <span>{username}</span>
                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-40 bg-white text-black rounded-lg shadow-lg">
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

       
          <div
           onClick={openCart}
            className="relative flex items-center gap-1 hover:text-[#F4A300] cursor-pointer"
          >
            <ShoppingCart size={18} />
            <span>Cart</span>

        
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] rounded-full px-2 py-0.5">
                {wishlist.length}
              </span>
            )}
          </div>

        </div>

        {/* MOBILE MENU */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 bg-[#003F63]">

          <div className="flex mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-10 px-3 text-black bg-white rounded-l-full"
            />
            <button className="bg-[#F4A300] px-4 rounded-r-full">
              Search
            </button>
          </div>

          <div className="flex flex-col mt-4 gap-4">

            {!token ? (
              <Link to="/register">
                <button className="flex items-center gap-2">
                  <User size={18} />
                  Sign In
                </button>
              </Link>
            ) : (
              <div className="flex justify-between">
                <span>{username}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 px-3 py-1 rounded text-white text-sm"
                >
                  Logout
                </button>
              </div>
            )}

            <button
             onClick={openCart}
              className="flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              Cart ({wishlist.length})
            </button>

          </div>
        </div>
      )}

       <CartSidebar
      isOpen={cartOpen}
      onClose={() => setCartOpen(false)}
      wishlist={wishlist}
    />

    </nav>
  );
}

export default Navbar;