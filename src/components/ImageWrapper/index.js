import React from "react";

const ImageWrapper = ({ imgUrl, croppedImgUrl, name }) => {
  return (
    <>
      {showModal && (
        <div className="modalContainer">
          <img src={imgUrl} alt={name} />
        </div>
      )}
      <div className="croppedImgContainer">
        <img src={croppedImgUrl} alt={name} />
      </div>
    </>
  );
};

export default ImageWrapper;
