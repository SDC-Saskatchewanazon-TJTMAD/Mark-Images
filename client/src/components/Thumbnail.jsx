import React from 'react';

const Thumbnail = ({id, image, hoverChoose, i, className, clickChoose }) => {

  return (
    <>
      <img
        id={id}
        className={className}
        i={i}
        src={image}
        onMouseEnter={hoverChoose}
        onMouseLeave={hoverChoose}
        onClick={clickChoose}
      />
    </>
  );
};

export default Thumbnail;
