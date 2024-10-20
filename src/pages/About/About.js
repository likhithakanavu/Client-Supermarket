import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Header from "../../components/home/Header/Header";
import HeaderBottom from "../../components/home/Header/HeaderBottom";
import Footer from "../../components/home/Footer/Footer";
import Image4 from "./design (4).png";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "");
  }, [location]);

  return (
    <>
      <Header />
      <HeaderBottom />
      <div className="max-w-container mx-auto px-4" style={{backgroundColor:"#f5fffa"}}>
        <Breadcrumbs title="About" prevLocation={prevLocation} />
        <div className="pb-10 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
          <div className="max-w-[600px] text-base text-lightText mb-2 lg:mb-0 lg:mr-4">
            <h1>
              <span className="text-primeColor font-semibold text-lg">
                is one of the world's leading ecommerce brands and is internationally
                recognized for celebrating the essence of classic Worldwide cool
                looking style.
              </span>{" "}
            </h1>
            <Link to="/shop">
              <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300 mt-4 lg:mt-8">
                Continue Shopping
              </button>
            </Link>
          </div>
          <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
            <img
              src={Image4}
              alt="About Orebi"
              className="w-full h-auto"
              style={{ maxHeight: '400px' }}  // Adjust this value as needed
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
