import React from "react";
import { X } from "lucide-react";
import SERVER_URL from "../Services/server_url";

function CartSidebar({
  isOpen,
  onClose,
  wishlist,
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-[380px] bg-white shadow-xl z-50 transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="font-bold text-xl text-black">
            Cart Items
          </h2>

          <button
            onClick={onClose}
            className="text-black"
          >
            <X />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
          {wishlist?.length > 0 ? (
            wishlist.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 border-b pb-4 mb-4"
              >
                <img
                  src={`${SERVER_URL}/uploads/${item?.product?.image?.[0]}`}
                  alt=""
                  className="w-20 h-20 object-cover rounded border"
                />

                <div>
                  <h3 className="font-semibold text-black">
                    {item?.product?.productName}
                  </h3>

                  <p className="text-[#F4A300] font-bold">
                    ₹
                    {item?.product?.variants?.[0]
                      ?.price || 0}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No items found
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default CartSidebar;