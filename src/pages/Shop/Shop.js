import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import Header from "../../components/home/Header/Header";
import HeaderBottom from "../../components/home/Header/HeaderBottom";
import Footer from "../../components/home/Footer/Footer";
import { useNavigate } from "react-router-dom";

const Shop = () => {

  let navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("UserToken") == null) {
      navigate("/signin");
    }
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(48);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Header />
      <HeaderBottom />
      <div className="max-w-container mx-auto px-4" style={{backgroundColor:"#f5fffa"}}>
        <Breadcrumbs title="Products" />
        <div className="w-full h-full flex pb-20 gap-10">
          <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
            <ShopSideNav onCategoryChange={handleCategoryChange} />
          </div>
          <div className="w-full mdl:w-[100%] lgl:w-[75%] h-full flex flex-col gap-10">
            <div className="flex items-center mb-4">
              <input 
                type="text"
                placeholder="Search by product name"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border rounded-md p-2 w-full md:w-1/3"
              />
            </div>
            <Pagination
              itemsPerPage={itemsPerPage}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
