import React, { useRef, useState, ChangeEvent } from "react";

interface PictureProps {
  readablePicture: string;
  setPicture: React.Dispatch<React.SetStateAction<File | null>>;
  setReadablePicture: (readablePicture: string) => void;
}

export default function Picture({
  readablePicture,
  setPicture,
  setReadablePicture,
}: PictureProps) {
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const pic = e.target.files?.[0];
    if (!pic) {
      setError("No file selected!");
      return;
    }
    if (
      pic.type !== "image/jpg" &&
      pic.type !== "image/jpeg" &&
      pic.type !== "image/png" &&
      pic.type !== "image/webp"
    ) {
      setError(`${pic.name} format is not supported`);
      return;
    } else if (pic.size > 1024 * 1024 * 7) {
      setError(`${pic.name} is too large. Maximum allowed size is 7 MB`);
      return;
    } else {
      setError("");
      setPicture(pic);

      // Read picture as DataURL for preview
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onload = (e) => {
        if (e.target?.result) {
          setReadablePicture(e.target.result as string);
        }
      };
    }
  };

  const handleChangePic = () => {
    setPicture(null);
    setReadablePicture("");
    inputRef.current?.click();
  };

  return (
    <div className="mt-8 space-y-2 text-gray-700 dark:text-gray-300">
      <label htmlFor="picture" className="text-sm font-semibold">
        Picture (Optional)
      </label>
      {readablePicture ? (
        <div className="flex flex-col items-center">
          <img
            src={readablePicture}
            alt="Profile"
            className="w-20 h-20 object-cover rounded-full shadow-md"
          />
          <button
            onClick={handleChangePic}
            className="mt-2 w-20 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Change
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full h-12 flex items-center justify-center rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 font-semibold cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Upload Picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpg,image/jpeg,image/webp"
        onChange={handleImage}
      />
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
