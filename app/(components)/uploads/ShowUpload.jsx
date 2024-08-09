"use client";

import React, { useState } from "react";
import Image from "next/image";

const ShowUpload = ({ imageurl, altText, size }) => {
  const [imgSrc, setImgSrc] = useState(imageurl);

  const handleError = () => {
    setImgSrc("/images/Profile_Placeholder.png");
  };

  return (
    <div className="relative rounded-full">
      <Image
        src={imgSrc}
        alt={altText}
        className="rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        width={500}
        height={500}
        onError={handleError}
      />
    </div>
  );
};

export default ShowUpload;
