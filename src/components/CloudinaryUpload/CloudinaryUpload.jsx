import { useEffect, useRef } from "react";

function CloudinaryUpload({ imageUrl, onImageUpload }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    // Initialize Cloudinary widget
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dojvyjghs",
        uploadPreset: "portfolio_unsigned",
        folder: "portfolio",
        sources: ["local", "url", "camera"],
        multiple: false,
        maxFileSize: 5000000, // 5MB
        clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
        maxImageWidth: 2000,
        maxImageHeight: 2000,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          // Upload successful - return the secure URL
          onImageUpload(result.info.secure_url);
        }
        if (error) {
          console.error("Cloudinary upload error:", error);
        }
      }
    );
  }, [onImageUpload]);

  const handleOpenWidget = () => {
    widgetRef.current.open();
  };

  return (
    <div className="CloudinaryUpload">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Project Image *
      </label>

      {/* Image Preview */}
      {imageUrl && imageUrl.trim() !== "" && (
        <div className="mb-3 relative group">
          <img
            src={imageUrl}
            alt="Project preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
            <button
              type="button"
              onClick={handleOpenWidget}
              className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white text-gray-700 font-semibold rounded-lg shadow-lg transition-opacity"
            >
              Change Image
            </button>
          </div>
        </div>
      )}

      {/* Upload Button */}
      <button
        type="button"
        onClick={handleOpenWidget}
        className={`w-full px-4 py-3 border-2 border-dashed rounded-lg transition-colors flex items-center justify-center gap-2 ${
          imageUrl
            ? "border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
            : "border-blue-400 bg-blue-50 text-blue-600 hover:bg-blue-100"
        }`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <span className="font-semibold">
          {imageUrl ? "Upload Different Image" : "Upload Image"}
        </span>
      </button>

      <p className="text-xs text-gray-500 mt-2">
        JPG, PNG, GIF, WebP • Max 5MB • Max 2000x2000px
      </p>
    </div>
  );
}

export default CloudinaryUpload;
