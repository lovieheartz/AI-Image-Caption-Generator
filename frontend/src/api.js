export async function uploadImage(file, style) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("style", style);

  const res = await fetch("/api/caption", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to generate caption");
  }

  return res.json();
}
