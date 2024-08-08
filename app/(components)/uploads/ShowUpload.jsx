"use client";

import React from "react";
import Image from "next/image";

const ShowUpload = ({ imageurl, altText, size }) => {
  return (
    <div className={`relative rounded-full`}>
      <Image
        src={imageurl}
        alt={altText}
        className="rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        width={500}
        height={500}
      />
    </div>
  );
};

export default ShowUpload;
