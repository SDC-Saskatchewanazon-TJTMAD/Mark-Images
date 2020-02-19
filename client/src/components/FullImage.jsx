import React from 'react';

const FullImage = ({ id, src, fullHover, clickIt, className }) => (
  <div className="prodcontainer">
    <img
      id={id}
      className={className}
      src={src}
      onMouseEnter={fullHover}
      onMouseLeave={fullHover}
      onClick={clickIt}
    />
  </div>
);

export default FullImage;
