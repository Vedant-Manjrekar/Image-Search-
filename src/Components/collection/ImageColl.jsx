import React, { useEffect } from "react";
import Images from "../images/Images.jsx";
import "./ImageColl.css";
import { useImage } from "../../Context/context";
import DisplayImage from "../display_image/DisplayImage.jsx";

function ImageColl({ data1, data2 }) {
  // using custom hook.
  const imageVisibility = useImage();

  // lazy loading code.
  const imgOptions = {
    rootMargin: "0px",
    threshold: 0,
  };

  function preloadImg(img) {
    const src = img.getAttribute("data-src");
    if (!src) {
      return;
    } else {
      img.src = src;
    }
  }

  // code for observing images.
  const imageObserver = new IntersectionObserver((entries, imageObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        preloadImg(entry.target);
        imageObserver.unobserve(entry.target);
      }
    });
  }, imgOptions);

  // starts obseving images when there is a change in data1, data2
  useEffect(() => {
    // getting all images with attribute data-src.
    const images = document.querySelectorAll("img[data-src]");

    // iterating all the fetched images to be observed.
    images.forEach((image) => {
      imageObserver.observe(image);
    });
  }, [data1, data2]);

  // detect change in imageVisibility.
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
      username: data.user.instagram_username,
      blur_hash: data.blur_hash,
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
      blur_hash: data.blur_hash,
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
      <div className="image_coll" id="image_coll">
        <div className="image_coll_1">
          {data_col1?.map((image, index) => {
            return (
              <Images
                key={index}
                image_url={image.url}
                username={image.username}
                all_urls={image.urls}
                blur_hash={image.blur_hash}
                num="1"
                download_url={image.download_link}
              />
            );
          })}
        </div>
        <div className="image_coll_2">
          {data_col2?.map((image, index) => {
            return (
              <Images
                key={index}
                image_url={image.url}
                username={image.username}
                all_urls={image.urls}
                blur_hash={image.blur_hash}
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
