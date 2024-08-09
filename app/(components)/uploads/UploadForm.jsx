"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import ShowUpload from "./ShowUpload";

const UploadForm = ({ profileType, profileUser }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const fileName = uuidv4();

  const router = useRouter();

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 20000000) {
        alert("File is too large. Please select a file under 5MB.");
        return;
      }
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      };

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

      router.refresh();
    } else if (profileType === "team") {
      const updatedTeam = {
        ...profileUser,
        logoUrl: fileName,
      };

      const res = await fetch(`/api/Teams/${profileUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: updatedTeam }),
      });
      if (!res.ok) {
        throw new Error("Failed to update team" + res.status);
      }
      console.log("Team Updated");

      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form onSubmit={handleSubmit}>
        <input
          id="file"
          type="file"
          onChange={onFileChange}
          accept="image/png, image/jpeg"
        />
        {imageSrc && (
          <div className="flex flex-col items-center">
            <h4>Preview</h4>
            <br />

            <ShowUpload
              imageurl={imageSrc}
              altText="Upload Preview"
              size={32}
            />

            <br />
          </div>
        )}
        <br />
        <br />
        <br />
        <div className="flex flex-col items-center">
          <button type="submit" disabled={uploading} className="btn w-1/3">
            Upload
          </button>
        </div>
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
