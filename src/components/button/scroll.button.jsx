import React, { useRef, useEffect, useState } from 'react';

const ScrollButton = ({type, action, children,  ...rest }) => {
  const scrollRef = useRef();
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("wheel", handleScroll);
    }
  }, [scrollRef.current]);

  const handleScroll = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      const returnValue = type.map(num => num * 0.01);
      action(returnValue);
      type
    }else {
      const returnValue = type.map(num => num * -0.01);
      action(returnValue);
    }
  };

  return (
    <button
      id='position-controler'
      ref={scrollRef}
      className='w-6 h-6 flex flex-col items-center justify-center text-gray-100'
      style={{ overflow: 'auto'}}    
      {...rest}
    >
      {children}
    </button>
  );
};

export default ScrollButton;