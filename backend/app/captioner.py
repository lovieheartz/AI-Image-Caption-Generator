from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import re

class CaptionGenerator:
    def __init__(self, model_name="Salesforce/blip-image-captioning-large"):
        print(f"Loading BLIP model: {model_name} ...")
        self.processor = BlipProcessor.from_pretrained(model_name)
        self.model = BlipForConditionalGeneration.from_pretrained(model_name)
        print("Model loaded.")

    def generate_caption(self, image, template="default", max_length=50, num_beams=3):
        """
        Generate a caption for the given image and apply the specified template.
        """
        inputs = self.processor(image, return_tensors="pt")
        output_ids = self.model.generate(
            **inputs,
            max_length=max_length,
            num_beams=num_beams,
            early_stopping=True
        )
        caption = self.processor.decode(output_ids[0], skip_special_tokens=True)

        # Apply template formatting
        caption = self._apply_template(caption, template)

        # Generate hashtags
        hashtags = self._generate_hashtags(caption)

        return caption, hashtags

    def _apply_template(self, caption, template):
        """
        Apply a formatting template to the caption.
        """
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

    def _generate_hashtags(self, caption, n=3):
        """
        Generate up to n hashtags based on keywords in the caption.
        """
        # Clean and split caption into words
        words = re.findall(r'\b\w+\b', caption.lower())

        stopwords = {
            "a", "the", "on", "and", "in", "of", "with", "to", "an", "at", "for", "by", "is", "this", "that"
        }

        keywords = [w for w in words if w not in stopwords]

        # Remove duplicates while preserving order
        unique = []
        for w in keywords:
            if w not in unique:
                unique.append(w)

        hashtags = [f"#{w}" for w in unique[:n]]
        return hashtags
