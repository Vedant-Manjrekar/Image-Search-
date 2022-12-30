import React, { useContext, useState } from "react";
const ImageContext = React.createContext();
const ImageUpdateContext = React.createContext();

// * function to access the state of image's visibility.
export function useImage() {
  return useContext(ImageContext);
}

// * function to update the state of image's visibility.
export function updateImage() {
  return useContext(ImageUpdateContext);
}

// * wrapper
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
