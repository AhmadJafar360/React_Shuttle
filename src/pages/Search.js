import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchPage from "../components/searchBar";
import Footer from "../components/Footer";

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