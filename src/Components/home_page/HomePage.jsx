import { useEffect, useState } from "react";
import "./HomePage.css";
import ImageColl from "../collection/ImageColl.jsx";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function HomePage() {
  //  state to show loading.
  const [buffer, setBuffer] = useState(null);

  // state for storing api data.
  const [apiData, setApiData] = useState(null);
  const [apiData2, setApiData2] = useState(null);

  // navigate Hook.
  const navigate = useNavigate();

  // clearing localstorage for api on reload or redirection.
  useEffect(() => {
    localStorage.removeItem("apiData1");
    localStorage.removeItem("apiData2");
  }, []);

  // actively looking for change in "apiData"
  useEffect(() => {
    // * if data is successfully fetched.
    if (apiData && apiData2 != null) {
      setBuffer(false);
      console.log("apiData1", apiData, "apiData2", apiData2);
    }
  }, [apiData, apiData2]);

  // function to fetch image data.
  // (parameters):
  // query: what user wants to search.
  // setstate: which state to modify.
  // localStorage_name: name of the localstorage key.
  // random: a random natural number to load different results everytime.
  function fetchData(query, setState, localStorage_name, random) {
    fetch(
      `https://api.unsplash.com/search/photos/?query=${query}&per_page=20&page=${random}&client_id=-pP7D6f7zhvIVLwG6je5coh4EKZ_aPFD0rXbQNkbej8`,
      {
        headers: {
          "access-control-allow-origin": "*",
        },
        mode: "cors",
      }
    )
      .then((data) => data.json())
      .then((data) => {
        localStorage.removeItem(`${localStorage_name}`);
        localStorage.setItem(
          `${localStorage_name}`,
          JSON.stringify(data.results)
        );
        setState(data.results);
        const event = new Event("storage");
        dispatchEvent(event);
      })
      .catch((error) => console.log(error));
  }

  // function to search images.
  function search(query) {
    const new_query = `${query} ++`;
    localStorage.setItem("query", query);

    // fetching data for 1st row
    fetchData(query, setApiData, "apiData1", Math.floor(Math.random() * 100));

    // fetching data for 2nd row
    fetchData(
      new_query,
      setApiData2,
      "apiData2",
      Math.floor(Math.random() * 100)
    );

    navigate("/search");
    setBuffer(true);
  }

  // function to perform search on enter.
  async function searchOnEnter(event) {
    if (event.key == "Enter") {
      search(event.target.value);
    }
  }

  return (
    <div className="app" id="app">
      <div className="homepage-main">
        {/* Search Bar */}
        <div className="search-box">
          <i className="searchIcon">
            <FaSearch
              color="black"
              onClick={() => search(document.getElementById("searchbar").value)}
            />
          </i>
          <input
            type="text"
            name=""
            id="searchbar"
            placeholder="Search here..."
            onKeyUp={searchOnEnter}
          />
        </div>

        {/* Text */}
        <p className="title">Download HD images for free.</p>

        {/* show loading when searched but data is not yet ready. */}
        {buffer ? <p>Loading..</p> : ""}
      </div>
    </div>
  );
}

export default HomePage;
