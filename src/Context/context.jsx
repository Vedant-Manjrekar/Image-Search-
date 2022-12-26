import React, { useContext, useState } from "react";
const ImageContext = React.createContext();
const ImageUpdateContext = React.createContext();
const sendetailsConetext = React.createContext();

export function useImage() {
  return useContext(ImageContext);
}

export function updateImage() {
  return useContext(ImageUpdateContext);
}

export function ImageProvider({ children }) {
  const [displayImage, setDisplayImage] = useState(false);

  function setAndRemoveImage() {
    setDisplayImage((prev) => !prev);
  }

  return (
    <ImageContext.Provider value={displayImage}>
      <ImageUpdateContext.Provider value={setAndRemoveImage}>
        {children}
      </ImageUpdateContext.Provider>
    </ImageContext.Provider>
  );
}

export default ImageContext;
