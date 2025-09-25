import React, { useEffect } from "react";
import Navbar from "../components/Global/Navbar";
import SearchPage from "../components/Pencarian/searchBar";
import Footer from "../components/Global/Footer";

const Home = () => {
  useEffect(() => {
    document.title = "Dashboard";
  });
  return (
    <div>
      <Navbar />
      <SearchPage />
      <Footer />
    </div>
  );
};

export default Home;