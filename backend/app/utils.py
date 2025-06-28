def suggest_hashtags(caption):
    keywords = caption.lower().split()[:5]
    hashtags = ["#" + k.strip(",.") for k in keywords]
    return " ".join(hashtags)
