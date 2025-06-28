from flask import Flask, request, jsonify
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import os
import csv
import json
from datetime import datetime
import re

app = Flask(__name__)

# Load BLIP model once
print("Loading BLIP model...")
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")
print("BLIP model loaded.")

# Directories and files
UPLOAD_FOLDER = 'sample'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

CSV_FILE = 'captions.csv'
JSON_FILE = 'captions.json'

def extract_hashtags(caption, n=5):
    words = re.findall(r'\b\w+\b', caption.lower())
    stopwords = {
        'a', 'the', 'on', 'and', 'in', 'of', 'with',
        'to', 'an', 'at', 'for', 'by', 'is', 'there', 'its'
    }
    keywords = [word for word in words if word not in stopwords]
    unique = []
    for w in keywords:
        if w not in unique:
            unique.append(w)
    hashtags = [f"#{w}" for w in unique[:n]]
    return hashtags

def apply_template(caption, template):
    if template == "uppercase":
        return caption.upper()
    elif template == "lowercase":
        return caption.lower()
    elif template == "emoji":
        return f"✨ {caption} ✨"
    elif template == "promotional":
        return f"🔥 {caption}\nCheck this out! 🔥"
    elif template == "callToAction":
        return f"{caption}\n💬 What do you think? Comment below! 👇"
    else:
        return caption

def write_csv(csv_file, filename, caption, hashtags):
    file_exists = os.path.isfile(csv_file)
    with open(csv_file, 'a', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        if not file_exists:
            writer.writerow(['filename', 'caption', 'hashtags'])
        writer.writerow([filename, caption, ', '.join(hashtags)])

def append_json(json_file, filename, caption, hashtags):
    data = []
    if os.path.exists(json_file):
        with open(json_file, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                data = []
    data.append({
        'filename': filename,
        'caption': caption,
        'hashtags': hashtags
    })
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)

@app.route('/api/caption', methods=['POST'])
def generate_caption():
    try:
        # Retrieve multiple files (frontend field name should be 'images')
        files = request.files.getlist('images')
        if not files or len(files) == 0:
            return jsonify({'error': 'No files uploaded'}), 400

        template = request.form.get('template', 'default')
        results = []

        for file in files:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"{timestamp}_{file.filename}"
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)

            image = Image.open(filepath)
            inputs = processor(images=image, return_tensors="pt")
            out = model.generate(**inputs, max_length=50)
            raw_caption = processor.decode(out[0], skip_special_tokens=True)
            caption = apply_template(raw_caption, template)
            hashtags = extract_hashtags(raw_caption)

            write_csv(CSV_FILE, filename, caption, hashtags)
            append_json(JSON_FILE, filename, caption, hashtags)

            results.append({
                'filename': filename,
                'raw_caption': raw_caption,
                'caption': caption,
                'hashtags': hashtags
            })

        return jsonify(results)

    except Exception as e:
        print("Error generating captions:", e)
        return jsonify({'error': 'Unable to generate captions'}), 500

if __name__ == '__main__':
    app.run(debug=True)
