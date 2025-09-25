import React from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Reservation from "./pages/Reservation";
import Payment from "./pages/Payment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
    </Router>
  );
};

export default App;