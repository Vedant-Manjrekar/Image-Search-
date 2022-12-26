import React from "react";
import "./Images.css";
import { updateImage } from "../../Context/context";

function Images({ image_url, num, username, all_urls }) {
  const updateImageVisibility = updateImage();

  return (
    <>
      {/* Adding styles according to column number to justify images (start or end) */}
      <div className={`${num == 1 ? "img_comp1" : "img_comp2"}`}>
        <img
          src={image_url}
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
