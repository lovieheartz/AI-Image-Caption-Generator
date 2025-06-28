import csv
import json

def export_csv(data, filename="captions.csv"):
    with open(filename, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["filename", "caption"])
        for item in data:
            writer.writerow([item["filename"], item["caption"]])

def export_json(data, filename="captions.json"):
    with open(filename, "w", encoding="utf-8") as jsonfile:
        json.dump(data, jsonfile, ensure_ascii=False, indent=2)
