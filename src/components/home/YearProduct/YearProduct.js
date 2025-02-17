import React from "react";
import { Link } from "react-router-dom";
import { productOfTheYear } from "../../../assets/images";
import ShopNow from "../../designLayouts/buttons/ShopNow";
import Image from "../../designLayouts/Image";
import Imagee from "./design.png"

const YearProduct = () => {
  return (
    <Link to="/shop">
      <div className="w-full h-80 mb-20 bg-[#f3f3f3] md:bg-transparent relative font-titleFont">
      <Image
  className="w-full h-full object-cover hidden md:inline-block"
  imgSrc={Imagee}
  style={{ objectFit: 'cover', width: '200px', height: '200px' }}
/>

<div className="w-full md:w-2/3 xl:w-1/2 h-80 absolute px-4 md:px-0 top-0 right-0 flex flex-col items-start gap-6 justify-center">
  <h1 className="text-3xl font-semibold text-white">
    Product of The Year
  </h1>
  <p className="text-base font-normal text-white max-w-[600px] mr-4">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat
    cupiditate modi amet! Facilis, aperiam quaerat.
  </p>


          <ShopNow />
        </div>
      </div>
    </Link>
  );
};

export default YearProduct;
