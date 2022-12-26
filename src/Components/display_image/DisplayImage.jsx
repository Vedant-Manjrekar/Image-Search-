import "./DisplayImage.css";
import React, { useState } from "react";
import { updateImage } from "../../Context/context";
import FileSaver from "file-saver";
import { BsInstagram } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import DownloadLinks from "../download_links/DownloadLinks";

function DisplayImage({ url, username }) {
  const [links, setLinks] = useState([]);
  const [showLinks, setShowLinks] = useState(false);
  const updateImageVisibility = updateImage();

  function remove() {
    updateImageVisibility();
    setShowLinks(false);
  }

  function redirect() {
    if (username != "undefined" || null) {
      window.open(`https://www.instagram.com/${username}/`, "_blank");
    } else {
      alert("Author is not available on Instagram.");
    }
  }

  function download() {
    setShowLinks(true);
    const images = JSON.parse(localStorage.getItem("all_urls"));
    setLinks(images);
  }

  return (
    <>
      <div className="features">
        <div className="cut" onClick={remove}>
          <ImCross color="white" />
        </div>
        <div onClick={redirect} className="download">
          <BsInstagram size={"32px"} />
        </div>
        <div onClick={download} className="download">
          <BsDownload size={"32px"} />
        </div>
      </div>

      <div className="display_img" id="display_img">
        <img src={url} alt="image" className="img" id="img" />
      </div>
      {showLinks ? (
        <DownloadLinks links={links} removeLinkPage={setShowLinks} />
      ) : (
        ""
      )}
    </>
  );
}

export default DisplayImage;
