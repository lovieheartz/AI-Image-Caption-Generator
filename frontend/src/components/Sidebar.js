import React, { useState } from "react";

function Sidebar({ history }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <aside
      className="w-72
    sticky top-0
    min-h-screen
    bg-white dark:bg-gray-900
    border-r border-gray-200 dark:border-gray-700
    p-4
    flex flex-col
    overflow-y-auto
    scrollbar-thin
    scrollbar-thumb-gray-400
    scrollbar-track-gray-200
    dark:scrollbar-thumb-gray-600
    dark:scrollbar-track-gray-800"
      style={{
        scrollbarWidth: "thin",
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
        🕒 Caption History
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No captions generated yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {history.map((item, idx) => (
            <li
              key={idx}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 cursor-pointer hover:shadow-sm hover:ring-1 hover:ring-indigo-400 transition-all duration-200"
              onClick={() => toggleExpand(idx)}
            >
              <div className="flex gap-2 items-center">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt="thumb"
                    className="w-10 h-10 object-cover rounded border"
                  />
                )}
                <div className="flex-1">
                  <time className="block text-xs text-gray-500">
                    {item.timestamp}
                  </time>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.hashtags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.hashtags.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{item.hashtags.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedIndex === idx ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Expanded Details */}
              <div
                className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                  expandedIndex === idx ? "max-h-96 mt-2" : "max-h-0"
                }`}
              >
                {expandedIndex === idx && (
                  <div className="border-t border-gray-300 dark:border-gray-700 pt-2 space-y-2">
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {item.caption}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.hashtags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white px-2 py-0.5 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default Sidebar;
