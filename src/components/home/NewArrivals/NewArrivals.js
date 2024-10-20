import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { newArrOne, newArrTwo, newArrThree, newArrFour } from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import axios from "axios";

const NewArrivals = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:7001/product/uview")
      .then((res) => {
        console.log("Products fetched:", res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full pb-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item._id} className="px-2">
            <Product
              _id={item._id}
              img={item.image}
              productName={item.name}
              price={item.price}
              color="red"
              badge="aa"
              des={item.description}
              pdf="pfd"
              ficheTech="ffff"
            />
          </div>
        ))}
       
      </Slider>
    </div>
  );
};

export default NewArrivals;
