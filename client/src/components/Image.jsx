import React from 'react';
import Thumbnail from './Thumbnail.jsx';
import FullImage from './FullImage.jsx';

const Image = ({ images, currentPhoto, id, hoverChoose, hover, fullHover, hoverMain, togglePopUp }) => (
  <>
    <div className="prodImage">
      <div className="fullImage">
        <div className="thumbnailsDiv">
          {images.map((url, index) => (
            <Thumbnail
              className="thumbnail"
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
          className="prodImage"
          src={currentPhoto ? currentPhoto : images[0]}
          fullHover={fullHover}
          clickIt={togglePopUp}
        />
      </div>
    </div>
    <div className="hoverText">
      {hoverMain ? <><br />Click image to open expanded view</> : <><br />Roll over image to zoom in</>}
    </div>
  </>
);

export default Image;
