import React from "react";

function CaptionResult({ caption, hashtags, file }) {
  const url = URL.createObjectURL(file);
  return (
    <div className="mt-6 text-center">
      <img src={url} alt="Preview" className="mx-auto rounded shadow" width="300" />
      <p className="mt-4 text-lg font-semibold">{caption}</p>
      <p className="text-gray-500">{hashtags}</p>
    </div>
  );
}

export default CaptionResult;
