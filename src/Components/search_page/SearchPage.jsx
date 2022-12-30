import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";
import ImageColl from "../collection/ImageColl";

function SearchPage() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  // function to navigate to homepage.
  function back() {
    navigate("/");
  }

  const query = localStorage.getItem("query");
  let apiData1 = JSON.parse(localStorage.getItem("apiData1"));
  let apiData2 = JSON.parse(localStorage.getItem("apiData2"));

  // when there is a change in localstorage.
  window.addEventListener("storage", () => {
    apiData1 = JSON.parse(localStorage.getItem("apiData1"));
    apiData2 = JSON.parse(localStorage.getItem("apiData2"));

    if (apiData1 != null && apiData2 != null) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  });

  // if page is refreshed.
  useEffect(() => {
    console.log(apiData1, apiData2);
    if (apiData1 && apiData2) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, []);

  return (
    <div className="search_page">
      <div className="navbar">
        <div className="back" onClick={back}>
          Back
        </div>
        <p className="results">Results for "{query}"</p>
        <p></p>
      </div>

      {load ? (
        <ImageColl query={query} data1={apiData1} data2={apiData2} />
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}

export default SearchPage;
