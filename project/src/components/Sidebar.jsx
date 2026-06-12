import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Check } from "lucide-react";
import {
  getPublicCategoriesAPI,
  getPublicSubByCategoryAPI,
} from "../Services/allAPI";

function Sidebar({
  onSelectCategory,
  onSelectSubCategory,
  selectedCategoryName,
  selectedSubCategoryName,
}) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getPublicCategoriesAPI();
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (catId) => {
    const isSame = openCategory === catId;

    setOpenCategory(isSame ? null : catId);
    setSelectedSub(null);

    onSelectCategory(catId);

    if (!isSame) {
      try {
        const res = await getPublicSubByCategoryAPI(catId);
        setSubCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSubClick = (sub) => {
    setSelectedSub(sub._id);
    onSelectSubCategory(sub._id);
  };

  const handleReset = () => {
    onSelectCategory(null);
    onSelectSubCategory(null);
    setOpenCategory(null);
    setSelectedSub(null);
  };

  return (
    <aside className="w-full h-[calc(100vh-80px)] overflow-y-auto bg-white border rounded-lg p-4 sticky top-20">

      <div className="text-sm mb-4 flex items-center flex-wrap">
        <span className="text-gray-500 cursor-pointer hover:text-[#003F63]">
          Home
        </span>

        <span className="mx-2 text-gray-400">/</span>

        <span
          onClick={handleReset}
          className="text-gray-500 cursor-pointer hover:text-[#003F63]"
        >
          All
        </span>

        {selectedCategoryName && (
          <>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-[#003F63] font-medium">
              {selectedCategoryName}
            </span>
          </>
        )}

        {selectedSubCategoryName && (
          <>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-[#003F63] font-medium">
              {selectedSubCategoryName}
            </span>
          </>
        )}
      </div>

      <h2 className="text-[#003F63] font-semibold mb-4">
        Categories
      </h2>

      {categories.map((cat) => (
        <div key={cat._id} className="mb-4">

          <button
            onClick={() => handleCategoryClick(cat._id)}
            className="w-full flex justify-between font-medium"
          >
            <span>{cat.categoryName}</span>

            {openCategory === cat._id ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {openCategory === cat._id && (
            <div className="ml-4 mt-3 space-y-3">

              {subCategories.length > 0 ? (
                subCategories.map((sub) => (
                  <div
                    key={sub._id}
                    onClick={() => handleSubClick(sub)}
                    className="flex items-center gap-2 cursor-pointer"
                  >

                    <div
                      className={`w-5 h-5 flex items-center justify-center border rounded ${
                        selectedSub === sub._id
                          ? "bg-[#003F63] border-[#003F63]"
                          : "bg-white border-gray-400"
                      }`}
                    >
                      {selectedSub === sub._id && (
                        <Check size={12} color="white" />
                      )}
                    </div>

                    <span className="text-sm">
                      {sub.subCategoryName}
                    </span>

                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400">
                  No subcategories
                </p>
              )}

            </div>
          )}

        </div>
      ))}
    </aside>
  );
}

export default Sidebar;