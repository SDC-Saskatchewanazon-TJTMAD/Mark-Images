import React from 'react';
import Thumbnail from './Thumbnail.jsx';
import FullImage from './FullImage.jsx';

const PopUpGallery = ({ images, id, currentPhoto, togglePopUp, prodName, clickChoose }) => {

  return (
    <div className="popup">
      <div className="popupgallery">
        <button className="close" type="button" onClick={togglePopUp}>X</button>
        <div className="popupMain">
          <FullImage
            id={id}
            className="popupprodimage"
            src={currentPhoto ? currentPhoto : images[0]}
          />
        </div>
        <h4 className="ProdName">{prodName}</h4><br />
        <div className="popupthumbnailsDiv">
          {images.map((url, index) => (
            <Thumbnail
              id={id}
              className="popupthumbnail"
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
