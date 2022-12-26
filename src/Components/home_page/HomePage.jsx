import { useEffect, useState } from "react";
import "./HomePage.css";
import ImageColl from "../collection/ImageColl.jsx";
import { FaSearch } from "react-icons/fa";

function HomePage() {
  const [apiData, setApiData] = useState(null);
  const [apiData2, setApiData2] = useState(null);
  const [searchbar, setSearchbar] = useState(true);
  const [search_query, setSearch_query] = useState(null);
  const [buffer, setBuffer] = useState(false);

  // * actively looking for change in "apiData"
  useEffect(() => {
    if (apiData != null) {
      document.getElementById("app").style.backgroundImage = "none";
      console.log(apiData, apiData2);
      setBuffer(false);
      setSearchbar(false);
    }
  }, [apiData]);

  function back() {
    location.reload();
  }

  function fetchData(query, setState, random) {
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
      .then((data) => `${setState(data.results)}`)
      .catch((error) => console.log(error));
  }

  function search(url) {
    console.log(url);
    const query = url;
    const new_query = `${url} ++`;
    setSearch_query(query);

    fetchData(query, setApiData, Math.floor(Math.random() * 100));

    fetchData(new_query, setApiData2);

    if (apiData == null) {
      setBuffer(true);
    } else {
      setBuffer(false);
      document.getElementById("app").style.backgroundImage = "none";
      setSearchbar(false);
    }

    console.log(apiData);
  }

  async function searchOnEnter(event) {
    if (event.key == "Enter") {
      search(event.target.value);
    }
  }

  return (
    <div className="app" id="app">
      {!searchbar && (
        <div className="navbar">
          <div className="back" onClick={back}>
            Back
          </div>
        </div>
      )}
      {searchbar ? (
        <div className="homepage-main">
          {/* Search Bar */}
          <div className="search-box">
            <i className="searchIcon">
              <FaSearch
                color="black"
                onClick={(event) =>
                  search(document.getElementById("searchbar").value)
                }
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
          {buffer ? <p>Loading..</p> : ""}
        </div>
      ) : (
        <ImageColl query={search_query} data1={apiData} data2={apiData2} />
      )}
    </div>
  );
}

export default HomePage;
