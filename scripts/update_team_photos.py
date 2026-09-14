import os
from PIL import Image

uploaded_dir = r"C:/Users/Ajay/.gemini/antigravity/brain/90152b8d-50fc-40a9-b7fc-c824aac2b02f/.user_uploaded"
dest_dir = r"c:/Users/Ajay/Downloads/Mandal/public/images/leadership"

os.makedirs(dest_dir, exist_ok=True)

# 1. Manoj Kulkarni
img_manoj = Image.open(os.path.join(uploaded_dir, "media_1788872353191.png")).convert("RGB")
crop_manoj = img_manoj.crop((93, 0, 374, 371)) # w=281, h=371
# Pad to square 371x371 with white
sq_manoj = Image.new("RGB", (371, 371), (255, 255, 255))
pad_left = (371 - 281) // 2
sq_manoj.paste(crop_manoj, (pad_left, 0))
sq_manoj.save(os.path.join(dest_dir, "manoj-kulkarni.jpg"), "JPEG", quality=95)
print(f"Updated manoj-kulkarni.jpg: {sq_manoj.size}")

# 2. Vijay Tandale
img_vijay = Image.open(os.path.join(uploaded_dir, "media_1788872353198.png")).convert("RGB")
crop_vijay = img_vijay.crop((23, 0, 305, 281)) # w=282, h=281
crop_vijay.save(os.path.join(dest_dir, "vijay-tandale.jpg"), "JPEG", quality=95)
print(f"Updated vijay-tandale.jpg: {crop_vijay.size}")

# 3. Somnath Bhau Bomble
img_somnath = Image.open(os.path.join(uploaded_dir, "media_1788872353209.png")).convert("RGB")
crop_somnath = img_somnath.crop((33, 0, 434, 404)) # w=401, h=404
crop_somnath.save(os.path.join(dest_dir, "somnath-bhau-bomble.jpg"), "JPEG", quality=95)
print(f"Updated somnath-bhau-bomble.jpg: {crop_somnath.size}")

# 4. Laxman Anna Thorat
img_laxman = Image.open(os.path.join(uploaded_dir, "media_1789384954372.jpg")).convert("RGB")
crop_laxman = img_laxman.crop((53, 0, 171, 156)) # w=118, h=156
# Pad to square 156x156 with white
sq_laxman = Image.new("RGB", (156, 156), (255, 255, 255))
pad_laxman_left = (156 - 118) // 2
sq_laxman.paste(crop_laxman, (pad_laxman_left, 0))
# Scale up for crisp retina display
sq_laxman_hd = sq_laxman.resize((468, 468), Image.Resampling.LANCZOS)
sq_laxman_hd.save(os.path.join(dest_dir, "laxman-anna-thorat.jpg"), "JPEG", quality=95)
print(f"Updated laxman-anna-thorat.jpg: {sq_laxman_hd.size}")

# 5. Chandrakant Salunke
img_chandrakant = Image.open(os.path.join(uploaded_dir, "media_1788872353224.png")).convert("RGB")
crop_chandrakant = img_chandrakant.crop((20, 0, 421, 399)) # w=401, h=399
crop_chandrakant.save(os.path.join(dest_dir, "chandrakant-salunke.jpg"), "JPEG", quality=95)
print(f"Updated chandrakant-salunke.jpg: {crop_chandrakant.size}")

print("All 5 photos successfully extracted and saved!")
