import React, { useEffect } from "react";
import Images from "../images/Images.jsx";
import "./ImageColl.css";
import { useImage } from "../../Context/context";
import DisplayImage from "../display_image/DisplayImage.jsx";

function ImageColl({ query, data1, data2 }) {
  const imageVisibility = useImage();

  useEffect(() => {
    if (imageVisibility) {
      document.getElementById("image_coll").style.filter =
        "brightness(40%) blur(4px)";
      document.getElementById("image_coll").style.pointerEvents = "none";
    } else {
      document.getElementById("image_coll").style.filter = "none";
      document.getElementById("image_coll").style.pointerEvents = "auto";
    }
  }, [imageVisibility]);

  const data_col1 = data1?.map((data) => {
    let obj = {
      description: data.description,
      url: data.urls.regular,
      urls: data.urls,
      height: data.height,
      download_link: data.links.download,
    };
    return obj;
  });

  const data_col2 = data2?.map((data) => {
    let obj = {
      description: data.description,
      url: data.urls.regular,
      urls: data.urls,
      height: data.height,
      download_link: data.links.download,
      username: data.user.instagram_username,
    };
    return obj;
  });

  return (
    <>
      {imageVisibility ? (
        <DisplayImage
          url={localStorage.getItem("url")}
          username={localStorage.getItem("instagram_username")}
        />
      ) : (
        "blank"
      )}
      <p className="results">Results for "{query}"</p>
      <div className="image_coll" id="image_coll">
        <div className="image_coll_1">
          {data_col1?.map((image) => {
            return (
              <Images
                image_url={image.url}
                username={image.username}
                all_urls={image.urls}
                num="1"
                download_url={image.download_link}
              />
            );
          })}
        </div>
        <div className="image_coll_2">
          {data_col2?.map((image) => {
            return (
              <Images
                image_url={image.url}
                username={image.username}
                all_urls={image.urls}
                num="2"
                download_url={image.download_link}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ImageColl;
