import os
from PIL import Image

src_dir = 'public/images/people/leadership'
out_dir = 'public/images/members/optimized'
os.makedirs(out_dir, exist_ok=True)

# Exact configuration for 1:1 portrait normalization
# Target: 800x800 square WebP
# Requirements:
# - Head/face: ~55-65% of image height
# - 15-20% breathing room above head
# - Shoulders visible
# - Complete hair, forehead, chin, ears visible
# - Consistent apparent head size across all 12 cards
# - Preserves original identity completely
configs = {
    1: {'id': '01_kalyan_aute', 'top': 0, 'size': 1145},
    2: {'id': '02_avinash_kulkarni', 'top': 0, 'size': 1143},
    3: {'id': '03_manoj_kulkarni', 'top': 0, 'size': 1086},
    4: {'id': '04_vijay_tandale', 'top': 0, 'size': 960},
    5: {'id': '05_chandrakant_salunke', 'top': 15, 'size': 920},
    6: {'id': '06_laxman_anna_thorat', 'special': 'white_pad'},
    7: {'id': '07_somnath_bhau_bombale', 'top': 0, 'size': 1086},
    8: {'id': '08_sunil_shankh', 'top': 0, 'size': 1086},
    9: {'id': '09_prakash_kadwade', 'top': 0, 'size': 1086},
    10: {'id': '10_nitin_kamble', 'top': 0, 'size': 1086},
    11: {'id': '11_datta_devkar', 'top': 0, 'size': 1086},
    12: {'id': '12_sushil_satdive_mangesh_thorat', 'top': 0, 'size': 1145},
}

for i in range(1, 13):
    cfg = configs[i]
    base_id = cfg['id']
    src_file = os.path.join(src_dir, f'{base_id}.png')
    if not os.path.exists(src_file):
        src_file = os.path.join(src_dir, f'{base_id}.jpg')
        
    img = Image.open(src_file).convert('RGB')
    W, H = img.size
    
    if cfg.get('special') == 'white_pad':
        # 06_laxman_anna_thorat has close-cropped source on pure white background (#FAFAFA).
        # We expand onto a 1:1 canvas with natural white background so head scale matches ~58%
        target_size = 1360
        bg_col = (252, 252, 252)
        sq = Image.new('RGB', (target_size, target_size), bg_col)
        sq.paste(img, ((target_size - W) // 2, 140))
    else:
        top = cfg.get('top', 0)
        size = cfg.get('size', min(W, H))
        left = max(0, (W - size) // 2)
        sq = img.crop((left, top, left + size, top + size))
        
    out_img = sq.resize((800, 800), Image.Resampling.LANCZOS)
    out_path = os.path.join(out_dir, f'{base_id}.webp')
    out_img.save(out_path, 'WEBP', quality=92, method=6)
    
    file_size_kb = os.path.getsize(out_path) / 1024
    print(f'Created {base_id}.webp: 800x800, {file_size_kb:.1f} KB')

print('All 12 optimized WebP images generated successfully!')
