import React from "react";
import "./DownloadLinks.css";
import { ImCross } from "react-icons/im";
import FileSaver from "file-saver";

function DownloadLinks({ links, removeLinkPage }) {
  // initializing empty array.
  let linksArray = [];

  // iterating object of links and storing them in an array in key value pairs.
  Object.keys(links).forEach((link) => {
    linksArray.push({ link: links[link], name: link });
  });

  // function to download the selected image.
  function download(url) {
    FileSaver.saveAs(url, "image.jpg");
  }

  return (
    <>
      <div className="links">
        <p className="link_header">Pick one size.</p>
        <div className="cross" onClick={() => removeLinkPage(false)}>
          <ImCross />
        </div>
        {linksArray.map((link, index) => (
          <p className="link_name" onClick={() => download(link.link)}>
            <a>{link.name}</a>
          </p>
        ))}
      </div>
    </>
  );
}

export default DownloadLinks;
