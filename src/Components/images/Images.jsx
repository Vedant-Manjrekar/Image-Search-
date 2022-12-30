import React, { useEffect, useRef, useState } from "react";
import "./Images.css";
import { updateImage } from "../../Context/context";
import blurry from "../../assets/blurry.jpeg";

// ? PROPS:- 1. image_url (image url which this component is supposed to render.)  2. num: row number. 3. usename: Authors instagram username. 4. all_urls: all download urls
function Images({ image_url, num, username, all_urls }) {
  // * custom context hook to update image visibilty state (of DisplayImage component).
  const updateImageVisibility = updateImage();

  return (
    <>
      {/* Adding styles according to column number to justify images (start or end) */}
      <div className={`${num == 1 ? "img_comp1" : "img_comp2"}`}>
        <img
          src={blurry}
          data-src={image_url}
          alt="An Image"
          className="image"
          onClick={() => {
            localStorage.setItem("all_urls", JSON.stringify(all_urls));
            localStorage.setItem("url", image_url);
            localStorage.setItem("instagram_username", username);

            updateImageVisibility();
          }}
        />
      </div>
    </>
  );
}

export default Images;
