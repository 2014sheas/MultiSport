"use client";

import React from "react";
import getCroppedImg from "./cropImage";
import Image from "next/image";

const ShowUpload = ({ imageurl, croppedArea }) => {
  cropImage();
  return (
    <div className="flex items-center justify-center">
      <Image src={imageurl} alt="Cropped Image" width={200} height={200} />
    </div>
  );
};

export default ShowUpload;
