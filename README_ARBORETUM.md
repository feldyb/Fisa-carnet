# Fisa Arboretului - Arboretum Sheet Interface

## Descriere / Description

Interfața "Fisa arboretului" este o aplicație web modernă pentru gestionarea și înregistrarea datelor despre arborete forestiere. Interfața este proiectată cu un design curat și modern, folosind o paletă de culori verde care reflectă natura forestieră.

The "Arboretum Sheet" interface is a modern web application for managing and recording data about forest arboreta. The interface is designed with a clean and modern design, using a green color palette that reflects the forest nature.

## Caracteristici / Features

### 🎨 Design Modern
- Interfață curată și intuitivă / Clean and intuitive interface
- Paletă de culori verde forestieră / Forest green color palette
- Design responsive pentru toate dispozitivele / Responsive design for all devices
- Logo SODESTRAL cu iconiță de copac / SODESTRAL logo with tree icon

### 📋 Secțiuni Funcționale / Functional Sections

#### 1. Identificare Generală / General Identification
- Câmp pentru identificare generală / Field for general identification
- CODU (cod de identificare) / CODU (identification code)
- ADM (administrație) / ADM (administration)
- Arbarere inventariai intégral / Full inventory logging
- INV (inventar) / INV (inventory)

#### 2. Clasificare Funcțională / Functional Classification
- ADM (administrație) / ADM (administration)
- FLS (status teren forestier) / FLS (forest land status)
- GF FCT (grup funcțional) / GF FCT (functional group)

#### 3. Statiune Forestieră / Forest Station
- TS (tip de stațiune) / TS (station type)
- FLS (status teren forestier) / FLS (forest land status)
- GOLU (tip de sol) / GOLU (soil type)

#### 4. Tabele de Specii / Species Tables
- **Specii și amestec** / Species and Mixture
  - Specia (Species)
  - Cod (Code)
  - P, R, DM (parametri)
- **Specii componente** / Component Species
  - Specia (Species)
  - Cod (Code)
  - P, DM, HM, VOLU (parametri)

### ⚡ Funcționalități Interactive / Interactive Features

#### Butoane de Acțiune / Action Buttons
- **Adâugâ apecie** - Adaugă rânduri noi în tabelul de specii
- **Adaugâ śpecie** - Adaugă rânduri noi în tabelul de specii componente
- **Renunta** - Resetează formularul cu confirmare

#### Funcționalități Avansate / Advanced Features
- **Editare inline** - Click pe rânduri pentru editare directă
- **Validare formular** - Validare automată a câmpurilor
- **Salvare automată** - Salvare automată în localStorage
- **Responsive design** - Adaptare pentru mobile și tablet

## Tehnologii Utilizate / Technologies Used

- **HTML5** - Structura semantică
- **CSS3** - Stilizare modernă cu Grid și Flexbox
- **JavaScript ES6+** - Funcționalități interactive
- **LocalStorage** - Persistența datelor în browser

## Structura Fișierelor / File Structure

```
├── arboretum.html      # Pagina principală / Main page
├── arboretum.css       # Stiluri / Styles
├── arboretum.js        # Funcționalități JavaScript / JavaScript functionality
└── README_ARBORETUM.md # Această documentație / This documentation
```

## Utilizare / Usage

1. Deschide `arboretum.html` în browser
2. Completează câmpurile de identificare generală
3. Selectează opțiunile din dropdown-uri
4. Adaugă specii în tabele folosind butoanele
5. Datele se salvează automat în browser

## Caracteristici Responsive / Responsive Features

- **Desktop** (> 768px): Layout cu 2 coloane
- **Tablet** (768px): Layout adaptat cu coloane stivuite
- **Mobile** (< 480px): Layout optimizat pentru ecrane mici

## Culori și Design / Colors and Design

### Paleta de Culori / Color Palette
- **Verde închis** / Dark Green: `#2d5016` (text principal)
- **Verde mediu** / Medium Green: `#4a7c59` (accente)
- **Verde deschis** / Light Green: `#81c784` (butoane secundare)
- **Verde foarte deschis** / Very Light Green: `#c8e6c9` (borduri)
- **Fundal verde** / Green Background: `#f0f8f0`

### Tipografie / Typography
- **Font principal** / Main Font: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Dimensiuni responsive** / Responsive sizes pentru toate elementele

## Funcționalități Viitoare / Future Features

- Export în PDF
- Sincronizare cu server
- Backup automat
- Validare avansată
- Interfață pentru administrare

## Suport / Support

Pentru suport tehnic sau întrebări, contactați echipa de dezvoltare.
For technical support or questions, contact the development team.