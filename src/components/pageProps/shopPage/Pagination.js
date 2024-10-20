import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import axios from "axios";

const Pagination = ({ itemsPerPage, selectedCategory, searchQuery }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]); // To keep a reference of all products

  useEffect(() => {
    axios.get("http://127.0.0.1:7001/product/uview")
      .then((res) => {
        console.log("Products fetched:", res.data);
        setItems(res.data);
        setAllItems(res.data); // Initialize all items
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("Category or Search Query changed, resetting itemOffset");
    setItemOffset(0); // Reset to first page on category or search change
  }, [selectedCategory, searchQuery]);

  const endOffset = itemOffset + itemsPerPage;

  console.log("Selected Category:", selectedCategory);
  console.log("Search Query:", searchQuery);

  // Filter items based on selectedCategory and searchQuery
  const filteredItems = allItems
    .filter(item => !selectedCategory || (item.c_id && item.c_id.name === selectedCategory))
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const currentItems = filteredItems.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div key={item._id} className="w-full">
              <Product
                _id={item._id}
                img={item.image}
                productName={item.name}
                price={item.price}
                super={item?.c_id?.name}
                des={item.description}
              />
            </div>
          ))
        ) : (
          <p>No products found for the selected category or search query.</p>
        )}
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center font-medium"
          previousLinkClassName="w-9 h-9 bg-primeColor flex justify-center items-center text-white rounded-sm"
          nextLinkClassName="w-9 h-9 bg-primeColor flex justify-center items-center text-white rounded-sm"
          breakLabel="..."
          containerClassName="flex gap-2 mt-14"
          activeLinkClassName="bg-primeColor text-white"
        />
        <p className="text-base mt-4 mdl:mt-0 text-gray-500">
          Product {itemOffset + 1} - {Math.min(endOffset, filteredItems.length)}{" "}
          <span className="font-semibold">of {filteredItems.length}</span>
        </p>
      </div>
    </div>
  );
};

export default Pagination;
