import React, { useState } from "react";
import { uploadImage } from "./api";

function FileUpload({ onResult }) {
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState("default");

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const data = await uploadImage(file, style);
      onResult({ ...data, file });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <select
        className="border p-2 rounded"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="uppercase">Uppercase</option>
        <option value="lowercase">Lowercase</option>
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="border p-2 rounded"
      />
      {loading && <p className="text-blue-500">Generating caption...</p>}
    </div>
  );
}

export default FileUpload;
