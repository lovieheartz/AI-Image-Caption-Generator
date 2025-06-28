import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainPanel from "./components/MainPanel";
import Header from "./components/Header";

function App() {
  const [images, setImages] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [template, setTemplate] = useState("default");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setImages((prev) => {
      // Prevent duplicates by checking file name + size
      const allFiles = [...prev, ...newFiles];
      const unique = [];
      const seen = new Set();

      for (const file of allFiles) {
        const id = `${file.name}_${file.size}`;
        if (!seen.has(id)) {
          seen.add(id);
          unique.push(file);
        }
      }
      return unique;
    });

    // Clear the input so selecting the same file again works
    e.target.value = null;
  };

  const handleTemplateChange = (selectedTemplate) => {
    setTemplate(selectedTemplate);
  };

  const handleClear = () => {
    setImages([]);
    setCaptions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please select one or more images.");
      return;
    }

    setLoading(true);
    setCaptions([]);

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("template", template);

    try {
      const response = await fetch("/api/caption", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        alert("Error generating captions.");
        return;
      }

      const timestamp = new Date().toLocaleString();

      const newCaptions = data.map((item, idx) => ({
        rawCaption: item.raw_caption,
        caption: item.caption,
        hashtags: item.hashtags,
        timestamp,
        imageUrl: URL.createObjectURL(images[idx]),
      }));

      setCaptions(newCaptions);
      setHistory((prev) => [...newCaptions, ...prev]);
    } catch (error) {
      console.error("Error:", error);
      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar history={history} />
      <div className="flex-1 flex flex-col">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <MainPanel
          images={images}
          captions={captions}
          loading={loading}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          onClear={handleClear}
          template={template}
          onTemplateChange={handleTemplateChange}
        />
      </div>
    </div>
  );
}

export default App;
