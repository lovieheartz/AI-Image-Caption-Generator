import React from "react";

function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        AI Image Caption Generator 📸
      </h1>
      <button
        onClick={toggleDarkMode}
        className="flex items-center space-x-2 px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
      >
        {darkMode ? (
          <>
            <span>Light Mode</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v1m0 16v1m8.485-8.485h1M3 12H2m15.364-6.364l.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"
              />
            </svg>
          </>
        ) : (
          <>
            <span>Dark Mode</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              />
            </svg>
          </>
        )}
      </button>
    </header>
  );
}

export default Header;
