import urllib.request
import time

time.sleep(2)
for i in range(5):
    try:
        with urllib.request.urlopen('http://localhost:3000') as r:
            html = r.read().decode('utf-8')
            print('Status:', r.status)
            expected = 'स्थापना १९९१ · धर्मवीर संभाजी क्रीडा मंडळ (भगवं वादळ), एन - ६ सिडको, छत्रपती संभाजीनगर'
            print('Contains exact expected text:', expected in html)
            print('Contains notranslate:', 'notranslate' in html)
            print('Contains translate=no:', 'translate="no"' in html)
            break
    except Exception as e:
        print(f'Attempt {i+1}: {e}')
        time.sleep(2)
