import React from "react";

function CaptionCard({ index, caption, rawCaption, hashtags }) {
  // If nothing to show, skip rendering
  if (!rawCaption && !caption && (!hashtags || hashtags.length === 0)) return null;

  const hasTemplate = caption && caption !== rawCaption;

  return (
    <div className="bg-white dark:bg-gray-800 mt-6 p-6 rounded-lg shadow max-w-2xl w-full space-y-6 border border-gray-200 dark:border-gray-700">
      {/* Caption Number */}
      <h2 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
        📄 Caption Image {index + 1}
      </h2>

      {/* Raw Caption */}
      {rawCaption && (
        <div>
          <h3 className="text-lg font-semibold mb-1 text-indigo-600 dark:text-indigo-300">
            ✨ Original Caption
          </h3>
          <p className="text-base text-gray-800 dark:text-gray-100 whitespace-pre-line">
            {rawCaption}
          </p>
        </div>
      )}

      {/* Generated Template */}
      {hasTemplate && (
        <div>
          <h3 className="text-lg font-semibold mb-1 text-indigo-600 dark:text-indigo-300">
            📝 Generated Template
          </h3>
          <p className="text-base text-gray-700 dark:text-gray-200 whitespace-pre-line">
            {caption}
          </p>
        </div>
      )}

      {/* Hashtags */}
      {hashtags && hashtags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-1 text-indigo-600 dark:text-indigo-300">
            🏷️ Hashtags
          </h3>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CaptionCard;
