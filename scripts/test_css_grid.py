import os
from PIL import Image, ImageDraw

dir_path = 'public/images/people/leadership'

custom_settings = {
    1: {'name': '01_kalyan_aute', 'pos_x': 50, 'pos_y': 10, 'scale': 1.0},
    2: {'name': '02_avinash_kulkarni', 'pos_x': 50, 'pos_y': 8, 'scale': 1.0},
    3: {'name': '03_manoj_kulkarni', 'pos_x': 50, 'pos_y': 10, 'scale': 1.0},
    4: {'name': '04_vijay_tandale', 'pos_x': 50, 'pos_y': 12, 'scale': 1.1},
    5: {'name': '05_chandrakant_salunke', 'pos_x': 50, 'pos_y': 15, 'scale': 1.15},
    6: {'name': '06_laxman_anna_thorat', 'pos_x': 50, 'pos_y': 3, 'scale': 1.0},
    7: {'name': '07_somnath_bhau_bombale', 'pos_x': 50, 'pos_y': 10, 'scale': 1.0},
    8: {'name': '08_sunil_shankh', 'pos_x': 50, 'pos_y': 6, 'scale': 1.0},
    9: {'name': '09_prakash_kadwade', 'pos_x': 50, 'pos_y': 10, 'scale': 1.0},
    10: {'name': '10_nitin_kamble', 'pos_x': 50, 'pos_y': 10, 'scale': 1.0},
    11: {'name': '11_datta_devkar', 'pos_x': 50, 'pos_y': 12, 'scale': 1.0},
    12: {'name': '12_sushil_satdive_mangesh_thorat', 'pos_x': 50, 'pos_y': 8, 'scale': 1.0},
}

def render_preview(box_size=300):
    grid = Image.new('RGB', (3 * (box_size + 30), 4 * (box_size + 40)), (245, 245, 245))
    draw = ImageDraw.Draw(grid)
    
    for i in range(1, 13):
        cfg = custom_settings[i]
        fname = cfg['name'] + '.png'
        p = os.path.join(dir_path, fname)
        img = Image.open(p).convert('RGB')
        W_s, H_s = img.size
        
        zoom = cfg.get('scale', 1.0)
        s_fit = max(box_size / W_s, box_size / H_s) * zoom
        W_d = int(W_s * s_fit)
        H_d = int(H_s * s_fit)
        resized = img.resize((W_d, H_d), Image.Resampling.LANCZOS)
        
        left = int((box_size - W_d) * (cfg['pos_x'] / 100.0))
        top = int((box_size - H_d) * (cfg['pos_y'] / 100.0))
        
        canvas = Image.new('RGB', (box_size, box_size), (245, 240, 235))
        canvas.paste(resized, (left, top))
        
        mask = Image.new('L', (box_size, box_size), 0)
        d_mask = ImageDraw.Draw(mask)
        d_mask.ellipse((0, 0, box_size, box_size), fill=255)
        
        circ = Image.new('RGB', (box_size, box_size), (245, 245, 245))
        circ.paste(canvas, (0, 0), mask)
        
        d_border = ImageDraw.Draw(circ)
        d_border.ellipse((0, 0, box_size-1, box_size-1), outline=(234, 88, 12), width=3)
        
        row_idx = (i - 1) // 3
        col_idx = (i - 1) % 3
        x = col_idx * (box_size + 30) + 15
        y = row_idx * (box_size + 40) + 25
        grid.paste(circ, (x, y))
        draw.text((x, y - 18), f"#{i:02d}: {cfg['name']} (y={cfg['pos_y']}%, scale={zoom})", fill=(0, 0, 0))
        
    grid.save('scripts/audit_out/css_settings_grid.jpg', quality=85)
    print('CSS settings grid saved to scripts/audit_out/css_settings_grid.jpg')

if __name__ == '__main__':
    render_preview()
