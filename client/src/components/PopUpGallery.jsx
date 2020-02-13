import React from 'react';
import Thumbnail from './Thumbnail.jsx';
import FullImage from './FullImage.jsx';

const PopUpGallery = ({ images, id, currentPhoto, togglePopUp, prodName, clickChoose }) => {

  return (
    <div className="tay-popup">
      <div className="tay-popupgallery">
        <button className="tay-close" type="button" onClick={togglePopUp}>X</button>
        <div className="tay-popupMain">
          <FullImage
            id={id}
            className="tay-popupprodimage"
            src={currentPhoto ? currentPhoto : images[0]}
          />
        </div>
        <h4 className="tay-ProdName">{prodName}</h4><br />
        <div className="tay-popupthumbnailsDiv">
          {images.map((url, index) => (
            <Thumbnail
              id={id}
              className="tay-popupthumbnail"
              key={index+id}
              image={url}
              width="100px"
              clickChoose={clickChoose}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopUpGallery;
