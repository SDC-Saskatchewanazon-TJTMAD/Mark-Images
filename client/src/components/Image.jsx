import React from 'react';
import Thumbnail from './Thumbnail.jsx';
import FullImage from './FullImage.jsx';

const Image = ({ images, currentPhoto, id, hoverChoose, hover, fullHover, hoverMain, togglePopUp }) => (
  <>
    <div className="tay-prodImage">
      <div className="tay-fullImage">
        <div className="tay-thumbnailsDiv">
          {images.map((url, index) => (
            <Thumbnail
              className="tay-thumbnail"
              key={id, index}
              id={id}
              i={index}
              image={url}
              hoverChoose={hoverChoose}
            />
          ))}
        </div>
        <FullImage
          id={id}
          className="tay-prodImage"
          src={currentPhoto ? currentPhoto : images[0]}
          fullHover={fullHover}
          clickIt={togglePopUp}
        />
      </div>
    </div>
    <div className="tay-hoverText">
      {hoverMain ? <><br />Click image to open expanded view</> : <><br />Roll over image to zoom in</>}
    </div>
  </>
);

export default Image;
