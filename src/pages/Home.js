import React, { useEffect } from "react";
import Navbar from "../components/Global/Navbar";
import Hero from "../components/Global/Hero";
import Footer from "../components/Global/Footer";

const Home = () => {
  useEffect(() => {
    document.title = "Dashboard";
  });
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;