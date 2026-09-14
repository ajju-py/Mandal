import os
from PIL import Image

dir_path = r"C:/Users/Ajay/.gemini/antigravity/brain/90152b8d-50fc-40a9-b7fc-c824aac2b02f/.user_uploaded"
for fname in sorted(os.listdir(dir_path)):
    fpath = os.path.join(dir_path, fname)
    if fname.endswith(".png") or fname.endswith(".jpg"):
        with Image.open(fpath) as img:
            print(f"{fname}: size={img.size}, mode={img.mode}")
