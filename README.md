# 🌿 Formular Silvic

Aplicație web simplă pentru introducerea datelor despre arbori — utilă pentru lucrări silvice, proiecte educaționale sau experimente de catalogare în teren.

## 🚀 Funcționalități

- Formular HTML compact și responsive
- Validare JavaScript cu feedback prietenos
- Stil personalizat, inspirat din natură
- Export PDF și Excel (biblioteci încărcate la cerere pentru performanță)
- PWA cu cache offline de bază

## 📂 Fișiere incluse

| Fișier         | Descriere                                  |
|----------------|---------------------------------------------|
| `index.html`   | Pagină principală                           |
| `birou.html`   | Modul Birou                                 |
| `teren.html`   | Modul Teren (geolocalizare, exporturi)      |
| `style.css`    | Design modern, simplu, cu temă naturală     |
| `app.js`       | Logica aplicației și exporturi (lazy-load)  |
| `manifest.json`| Manifest PWA                                 |
| `service-worker.js` | Cache offline și strategii de fetch   |

## 🖼️ Preview

![Preview interfață](preview.png)

## 🛠️ Utilizare locală

1. Deschide fișierele direct în browser sau rulează un server static (ex.: `npx serve .`)

## ⚡ Optimizări de performanță

- Scripturile grele (`jsPDF`, `XLSX`) sunt încărcate doar când sunt necesare
- `app.js` este încărcat cu `defer` pentru a nu bloca randarea
- Service Worker cu cache-first pentru resursele statice
- Meta `viewport` pentru randare mobilă optimă
