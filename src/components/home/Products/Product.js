import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";

const Product = (props) => {
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);
  const [wishList, setWishList] = useState([]);
  const navigate = useNavigate();
  const productItem = props;

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleProductDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const handleWishList = () => {
    toast.success("Product add to wish List");
    setWishList(wishList.push(props));
    console.log(wishList);
  };

  const HandleCart = (id) => {
    console.log("hi");
    let token = JSON.parse(localStorage.getItem('UserToken'));

    axios
      .post(`http://localhost:7001/cart/Insert/${id}`, null, { headers: { "auth-token": token } })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          navigate('/shop');
        }else{
        alert("added to cart");
      }
        if (res.data.success) {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleFeedbackSubmit = () => {
    // Add your API call or feedback handling logic here
    console.log("Rating:", rating);
    console.log("Description:", description);
    // Reset form
    setRating(0);
    setDescription("");
  };

  return (
    <div className="w-full relative group">
      <div className="max-w-80 max-h-80 relative overflow-y-hidden">
        <div onClick={() => handleProductDetails(props._id)}>
          <Image className="w-full h-full" imgSrc={`http://localhost:7001/upload/${props.img}`} />
        </div>
        <div className="absolute top-6 left-8">
          {/* {props.badge && <Badge text="New" />} */}
          
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            {/* <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li> */}
            <li
              onClick={() => HandleCart(props._id)}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to List
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <Link
              to={`/product/${props._id}`}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full block"
            >
              <li>
                View Details <MdOutlineLabelImportant />
                {/* <span className="text-lg"> */}
                {/* </span> */}
              </li>
            </Link>
            {/* <li
              onClick={handleWishList}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="max-w-80 py-6 flex flex-col gap-1 border-[1px] border-t-0 px-4">
      <h4 className=" text-secondaryColor font-bold">
            {props.super}
          </h4>
        <div className="flex items-center justify-between font-titleFont">
       
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[14px]">${props.price}</p>
        </div>
        {/* <div>
          <p className="text-[#767676] text-[14px]">{props.color}</p>
        </div> */}
      </div>

      {/* Feedback Form */}
    
    </div>
  );
};

export default Product;
