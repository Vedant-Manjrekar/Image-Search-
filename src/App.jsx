import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/home_page/HomePage";
import DisplayImage from "./Components/display_image/DisplayImage";
import SearchPage from "./Components/search_page/SearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<SearchPage />} path="/search" />
        <Route element={<HomePage />} path="/" />
      </Routes>
    </>
  );
}

export default App;
