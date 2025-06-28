# AI Image Caption Generator

An AI-powered web app to generate creative captions for images using Hugging Face's BLIP model with multiple style templates and live previews.Great for learning multimodal AI and content automation basics.

This project combines:
- ⚡ **Python + Flask** as the backend API server.
- ⚛️ **React + Tailwind CSS** as the modern frontend.
- 🌙 **Dark Mode** support.

---

## ✨ Features

✅ Upload one or multiple images at once  
✅ Preview all selected images before generating captions  
✅ Choose from different caption templates:
- Default
- Uppercase
- Lowercase
- ✨ Emoji
- 🔥 Promotional
- 💬 Call to Action  

✅ Copy captions and hashtags easily  
✅ Dark mode toggle  
✅ View history of generated captions  

---

## 🖥️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Python, Flask
- **State Management:** React Hooks
- **Styling:** Tailwind utility classes

---

## 🚀 Getting Started

These instructions will help you run the app locally.

---

### 🛠️ Prerequisites

- **Python 3.8+**
- **Node.js 16+**
- **npm**

---

### 📂 Clone the Repository

```bash
git clone https://github.com/lovieheartz/AI-Image-Caption-Generator
cd image-caption-generator
⚙️ Backend Setup (Flask)
cd backend

python -m venv venv
On Windows: venv\Scripts\activate
pip install -r requirements.txt
python api.py

🌐 Frontend Setup (React)
cd frontend
npm install
npm start

**🎯 API Endpoint**
POST /api/caption

Description:
Generates captions and hashtags for uploaded images.

Request Parameters:

images (multipart form files) – one or more image files.

template (string) – one of:

default
uppercase
lowercase
emoji
promotional
callToAction

**🌓 Dark Mode**
Click the toggle button in the header to switch between Light and Dark themes

**Contact**
Created by Rehan Farooque.
