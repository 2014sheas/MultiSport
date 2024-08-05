"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Cropper from "react-easy-crop";
import { croppie } from "croppie";
// import { getCroppedImg } from "./cropImage";

const UploadForm = ({ profileType, profileUser }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const fileName = uuidv4();

  const router = useRouter();

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(croppedArea);

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/Upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: fileName, contentType: file.type }),
      }
    );

    if (response.ok) {
      const { url, fields } = await response.json();

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        alert("Upload successful!");
      } else {
        alert("Upload failed.");
      }
    } else {
      alert("Failed to get pre-signed URL.");
    }

    setUploading(false);

    if (profileType === "player") {
      const updatedPlayer = {
        ...profileUser,
        profile_image: fileName,
        croppedArea: croppedArea,
      };
      console.log(updatedPlayer);

      const res = await fetch(`/api/Players/${profileUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: updatedPlayer }),
      });
      if (!res.ok) {
        throw new Error("Failed to update player" + res.status);
      }
      console.log(res);
      console.log(updatedPlayer);
      console.log("Player Updated");

      router.refresh();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="file"
          type="file"
          onChange={onFileChange}
          accept="image/png, image/jpeg"
        />
        {imageSrc && (
          <div className="relative w-full h-[200px] bg-[#333] sm:h-[400px]">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
              onCropAreaChange={setCroppedArea}
            />
          </div>
        )}
        <button type="submit" disabled={uploading}>
          Upload
        </button>
      </form>
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default UploadForm;
