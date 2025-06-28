import React from "react";
import CaptionCard from "./CaptionCard";

function MainPanel({
  images = [],
  captions = [],
  loading,
  onFileChange,
  onSubmit,
  onClear,
  template,
  onTemplateChange,
}) {
  return (
    <main className="flex-1 min-h-screen overflow-y-auto flex flex-col items-center justify-start p-8 bg-gray-50 dark:bg-gray-900 transition">
      <h1 className="text-3xl font-extrabold mb-8 text-indigo-700 dark:text-indigo-300">
        Upload Your Images <span className="text-4xl">📷</span>
      </h1>

      <form
        onSubmit={onSubmit}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 w-full max-w-2xl flex flex-col items-center space-y-4"
      >
        {/* Hidden Inputs */}
        <input
          id="file-upload-initial"
          type="file"
          accept="image/*"
          multiple
          onChange={onFileChange}
          className="hidden"
        />
        <input
          id="file-upload-more"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            // Append new files instead of replacing
            const newFiles = Array.from(e.target.files);
            if (newFiles.length > 0) {
              onFileChange({
                target: {
                  files: [...images, ...newFiles],
                },
              });
            }
          }}
          className="hidden"
        />

        {/* Upload Area */}
        {images.length === 0 ? (
          <label
            htmlFor="file-upload-initial"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 w-full cursor-pointer hover:border-indigo-500 transition"
          >
            <svg
              className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16V4m0 0L3 8m4-4l4 4M21 12h-6m0 0l3-3m-3 3l3 3"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">
              Click to upload images
            </p>
          </label>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2 w-full">
              {images.map((file, idx) => (
                <div key={idx} className="w-full aspect-square relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${idx}`}
                    className="w-full h-full object-cover rounded border border-gray-300 dark:border-gray-700 shadow"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                document.getElementById("file-upload-more").click()
              }
              className="mt-3 w-full flex items-center justify-center bg-indigo-500 text-white font-semibold py-2 rounded hover:bg-indigo-600 transition"
            >
              Upload More Images
            </button>
          </>
        )}

        {/* Template Selector */}
        <div className="w-full">
          <label
            htmlFor="template"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Caption Style
          </label>
          <select
            id="template"
            value={template}
            onChange={(e) => onTemplateChange(e.target.value)}
            className="block w-full rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm py-2 px-3"
          >
            <option value="default">Default</option>
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="emoji">✨ Emoji</option>
            <option value="promotional">🔥 Promotional</option>
            <option value="callToAction">💬 Call To Action</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col md:flex-row gap-4 mt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Generating...
              </>
            ) : (
              "Generate Captions"
            )}
          </button>

          {images.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="flex-1 flex items-center justify-center bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
            >
              Clear All
            </button>
          )}
        </div>
      </form>

      {/* Caption Results */}
      <div className="mt-8 w-full max-w-2xl space-y-6">
        {captions.map((item, idx) => (
          <CaptionCard
            key={idx}
            index={idx}
            caption={item.caption}
            rawCaption={item.rawCaption}
            hashtags={item.hashtags}
          />
        ))}
      </div>
    </main>
  );
}

export default MainPanel;
