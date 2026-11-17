# Neon Tetris

Vanilla JavaScript, HTML Canvas ve CSS ile hazırlanmış, çevrimdışı çalışabilen yerel Tetris oyunu.

## Çalıştırma

Proje klasöründe terminal açıp şu komutu çalıştırın:

```bash
python -m http.server 5500
```

Windows'ta `python` komutu yoksa `py -m http.server 5500` kullanın. Node.js yüklüyse `npx --yes serve .` alternatifi de vardır. Ardından http://localhost:5500 adresini açın. ES modülleri nedeniyle `index.html` dosyasını doğrudan `file://` ile açmayın.

## Kontroller

| Tuş | İşlem |
| --- | --- |
| ← / → | Sola / sağa hareket |
| ↓ | Yumuşak düşüş |
| ↑ / X | Saat yönünde döndür |
| Z | Saat yönünün tersine döndür |
| Space | Hızlı düşüş |
| C | Taşı beklet |
| P / Esc | Duraklat / devam et |
| R | Yeni oyun |
| M | Sesi aç / kapat |

Mobilde oyun alanı altındaki dokunmatik tuşları kullanın. En iyi skor ve ses tercihi tarayıcı localStorage alanında saklanır.

## Oyun mantığı testleri

Node.js 18 veya üzeri ile proje klasöründe `node --test` komutunu çalıştırın.
