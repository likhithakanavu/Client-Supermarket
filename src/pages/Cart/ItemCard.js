import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteItem, drecreaseQuantity, increaseQuantity } from "../../redux/orebiSlice";
import axios from "axios";
import { Link } from "react-router-dom";


const ItemCard = ({ item,onRemove,onIncrease, onDecrease }) => {
  const dispatch = useDispatch();
 

 
 
  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => onRemove(item?._id)}
          className="text-primeColor hover:text-red-500 duration-300 cursor-pointer"
        />
      <Link to={`/product/${item?.p_id?._id}`} >  <img className="w-32 h-32" src={`http://localhost:7001/upload/${item?.p_id?.image}`} alt="productImage" /> </Link>
        <h1 className="font-titleFont font-semibold">{item?.p_id?.name}</h1>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          ₹{item?.p_id?.price}
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
             onClick={() => onDecrease(item._id)}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{item.qty}</p>
          <span
           onClick={() => onIncrease(item._id)}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex items-center font-titleFont font-bold text-lg">
          <p>₹{item?.qty * item?.p_id.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
