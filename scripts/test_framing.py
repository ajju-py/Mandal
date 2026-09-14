import os
from PIL import Image, ImageDraw

os.makedirs('scripts/audit_out/preview', exist_ok=True)
dir_path = 'public/images/people/leadership'

configs = {
    1: {'name': '01_kalyan_aute', 'top': 0, 'size': 1145},
    2: {'name': '02_avinash_kulkarni', 'top': 0, 'size': 1143},
    3: {'name': '03_manoj_kulkarni', 'top': 0, 'size': 1086},
    4: {'name': '04_vijay_tandale', 'top': 0, 'size': 1145},
    5: {'name': '05_chandrakant_salunke', 'top': 20, 'size': 1086},
    6: {'name': '06_laxman_anna_thorat', 'special': 'white_pad'},
    7: {'name': '07_somnath_bhau_bombale', 'top': 0, 'size': 1086},
    8: {'name': '08_sunil_shankh', 'top': 0, 'size': 1086},
    9: {'name': '09_prakash_kadwade', 'top': 0, 'size': 1086},
    10: {'name': '10_nitin_kamble', 'top': 0, 'size': 1086},
    11: {'name': '11_datta_devkar', 'top': 0, 'size': 1086},
    12: {'name': '12_sushil_satdive_mangesh_thorat', 'top': 0, 'size': 1145},
}

for i in range(1, 13):
    cfg = configs[i]
    fname = cfg['name'] + '.png'
    p = os.path.join(dir_path, fname)
    img = Image.open(p).convert('RGB')
    W, H = img.size
    
    if cfg.get('special') == 'white_pad':
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
    out_img.save(f'scripts/audit_out/preview/{i:02d}_preview.jpg', quality=90)
    
    # Also save a circular masked version
    mask = Image.new('L', (800, 800), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, 800, 800), fill=255)
    circ = Image.new('RGB', (800, 800), (245, 245, 245))
    circ.paste(out_img, (0, 0), mask)
    circ.save(f'scripts/audit_out/preview/{i:02d}_circle.jpg', quality=90)

print('Generated previews in scripts/audit_out/preview/')
