import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const App = () => {
  const [formData, setFormData] = useState({
    isj: '', os: '', up: '', ua: '', subparcela: '', suprafata: '',
    fond: '', tp: '', poluare: '', drum: '', distanta: '', str: '',
    cns: '', crt: '', reg: '', ta: '', fct: '', relief: '', cne: '',
    expo: '', in: '', alt_min: '', alt_max: '', sol: '', erz: '',
    flora: '', ts: '', inv: '', te: '', urg: '', prm: '', nim: '',
    nid: '', lx: '', lp: '', dc: '', tel: '', sp1: '', sp2: '',
    sp3: '', sp4: '', sp5: '', sp6: '', sba: '', so: '', mr: '',
    ds: '', vs: '', vs_sp1: '', vs_sp2: '', vs_sp3: '', vs_sp4: '',
    vs_sp5: '', vs_sp6: '', soc: '', rs: '', nrs: '',
  });

  const [elemente, setElemente] = useState([]);

  const adaugaRand = () => {
    setElemente(prev => [...prev, {
      elem: '', mrg: '', varsta: '', prop: '', diametru: '',
      inaltime: '', m: '', ams: '', elg: '', vit: '', cal: '',
      crest: '', volum: '', pex: '', provenienta: ''
    }]);
  };

  const stergeRand = (index) => {
    setElemente(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleElementChange = (e, index) => {
    const { name, value } = e.target;
    const newElemente = [...elemente];
    newElemente[index] = { ...newElemente[index], [name]: value };
    setElemente(newElemente);
  };

  const get = (id) => formData[id] || '-';

  // Download helper care functioneaza si pe Android
  const downloadBlob = (content, filename, type) => {
    try {
      const blob = new Blob([content], { type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      alert('Eroare la descarcare: ' + err.message);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const fisa = { ...formData, elemente };
    try {
      localStorage.setItem('fisa_' + fisa.subparcela, JSON.stringify(fisa));
    } catch (err) {
      console.warn('localStorage nu e disponibil:', err);
    }
    const filename = `fisa_UP${fisa.up}_UA${fisa.ua}_SP${fisa.subparcela}.json`;
    downloadBlob(JSON.stringify(fisa, null, 2), filename, 'application/json');
    alert('Fisa a fost salvata!');
  };

  const exportPDF = () => {
    try {
      const doc = new jsPDF({ orientation: 'landscape' });
      const filename = `fisa_UP${get('up')}_UA${get('ua')}_SP${get('subparcela')}.pdf`;

      doc.setFontSize(14);
      doc.text(`FISA TEREN - Subparcela: ${get('subparcela')} / UP: ${get('up')} / UA: ${get('ua')}`, 14, 15);

      autoTable(doc, {
        startY: 22,
        head: [['ISJ', 'OS', 'UP', 'UA', 'Subparcela', 'Suprafata (ha)']],
        body: [[get('isj'), get('os'), get('up'), get('ua'), get('subparcela'), get('suprafata')]],
        theme: 'grid',
        headStyles: { fillColor: [34, 139, 34] },
      });

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 4,
        head: [['Fond', 'TP', 'Poluare', 'Drum', 'Distanta (m)', 'STR', 'CNS', 'CRT', 'REG', 'TA']],
        body: [[get('fond'), get('tp'), get('poluare'), get('drum'), get('distanta'), get('str'), get('cns'), get('crt'), get('reg'), get('ta')]],
        theme: 'grid',
        headStyles: { fillColor: [34, 139, 34] },
      });

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 4,
        head: [['FCT', 'Relief', 'CNE', 'Expozitie', 'IN', 'Alt min', 'Alt max', 'Sol', 'Eroziune', 'Flora', 'TS']],
        body: [[get('fct'), get('relief'), get('cne'), get('expo'), get('in'), get('alt_min'), get('alt_max'), get('sol'), get('erz'), get('flora'), get('ts')]],
        theme: 'grid',
        headStyles: { fillColor: [0, 100, 0] },
      });

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 4,
        head: [['An inventar', 'TE', 'URG', 'PRM', 'NIM', 'NID', 'Luc. exec.', 'Luc. prop.', 'Date compl.']],
        body: [[get('inv'), get('te'), get('urg'), get('prm'), get('nim'), get('nid'), get('lx'), get('lp'), get('dc')]],
        theme: 'grid',
        headStyles: { fillColor: [0, 128, 128] },
      });

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 4,
        head: [['TEL', 'SP1', 'SP2', 'SP3', 'SP4', 'SP5', 'SP6', 'SBA', 'SO', 'MR', 'DS']],
        body: [[get('tel'), get('sp1'), get('sp2'), get('sp3'), get('sp4'), get('sp5'), get('sp6'), get('sba'), get('so'), get('mr'), get('ds')]],
        theme: 'grid',
        headStyles: { fillColor: [0, 128, 128] },
      });

      autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 4,
        head: [['VS', 'VS_SP1', 'VS_SP2', 'VS_SP3', 'VS_SP4', 'VS_SP5', 'VS_SP6', 'SOC', 'RS', 'NRS']],
        body: [[get('vs'), get('vs_sp1'), get('vs_sp2'), get('vs_sp3'), get('vs_sp4'), get('vs_sp5'), get('vs_sp6'), get('soc'), get('rs'), get('nrs')]],
        theme: 'grid',
        headStyles: { fillColor: [0, 128, 128] },
      });

      if (elemente.length > 0) {
        autoTable(doc, {
          startY: doc.lastAutoTable.finalY + 4,
          head: [['Elem', 'MRG', 'Varsta', 'Prop', 'Diam', 'Inalt', 'M', 'AMS', 'ELG', 'VIT', 'Cal', 'Crest', 'Volum', 'PEX', 'Prov']],
          body: elemente.map(el => [
            el.elem || '-', el.mrg || '-', el.varsta || '-', el.prop || '-',
            el.diametru || '-', el.inaltime || '-', el.m || '-', el.ams || '-',
            el.elg || '-', el.vit || '-', el.cal || '-', el.crest || '-',
            el.volum || '-', el.pex || '-', el.provenienta || '-'
          ]),
          theme: 'grid',
          headStyles: { fillColor: [139, 69, 19] },
        });
      }

      // Salveaza PDF - compatibil Android
      const pdfOutput = doc.output('blob');
      downloadBlob(pdfOutput, filename, 'application/pdf');
    } catch (err) {
      alert('Eroare PDF: ' + err.message);
    }
  };

  const incarcaFisa = () => {
    try {
      const key = 'fisa_' + formData.subparcela;
      const saved = localStorage.getItem(key);
      if (saved) {
        const fisa = JSON.parse(saved);
        const { elemente: elem, ...rest } = fisa;
        setFormData(rest);
        setElemente(elem || []);
        alert('Fisa incarcata!');
      } else {
        alert('Nu exista fisa salvata pentru subparcela: ' + formData.subparcela);
      }
    } catch (err) {
      alert('Eroare la incarcare: ' + err.message);
    }
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px',
    margin: '4px 0 10px 0',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#333',
  };

  const sectionStyle = {
    background: '#f0f7f0',
    border: '1px solid #2d7a2d',
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '16px',
  };

  const h2Style = {
    color: '#2d7a2d',
    borderBottom: '2px solid #2d7a2d',
    paddingBottom: '4px',
    marginTop: '0',
  };

  const btnStyle = {
    padding: '12px 20px',
    margin: '6px',
    fontSize: '15px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const Field = ({ id, label, placeholder }) => (
    <div>
      <label style={labelStyle} htmlFor={id}>{label}</label>
      <input
        id={id}
        style={inputStyle}
        placeholder={placeholder || label}
        value={formData[id]}
        onChange={handleFormChange}
      />
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '12px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1a5e1a', textAlign: 'center', fontSize: '20px' }}>
        FISA SILVICA - v1.0
      </h1>

      <form onSubmit={handleSave}>

        <div style={sectionStyle}>
          <h2 style={h2Style}>IDENTIFICARE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field id="isj" label="ISJ" />
            <Field id="os" label="OS" />
            <Field id="up" label="UP" />
            <Field id="ua" label="UA" />
            <Field id="subparcela" label="Subparcela" />
            <Field id="suprafata" label="Suprafata (ha)" />
            <Field id="fond" label="Fond Funciar" />
            <Field id="tp" label="Tip Padure (TP)" />
            <Field id="poluare" label="Poluare" />
            <Field id="drum" label="Drum" />
            <Field id="distanta" label="Distanta (m)" />
            <Field id="str" label="STR" />
            <Field id="cns" label="CNS" />
            <Field id="crt" label="CRT" />
            <Field id="reg" label="Regim (REG)" />
            <Field id="ta" label="Varsta actuala (TA)" />
          </div>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>STATIUNE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field id="fct" label="Functionalitate (FCT)" />
            <Field id="relief" label="Relief" />
            <Field id="cne" label="CNE" />
            <Field id="expo" label="Expozitie" />
            <Field id="in" label="IN" />
            <Field id="alt_min" label="Altitudine minima" />
            <Field id="alt_max" label="Altitudine maxima" />
            <Field id="sol" label="Sol" />
            <Field id="erz" label="Eroziune" />
            <Field id="flora" label="Flora" />
            <Field id="ts" label="Tip Statiune (TS)" />
          </div>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>INVENTAR</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field id="inv" label="An inventar" />
            <Field id="te" label="Varsta exploatare (TE)" />
            <Field id="urg" label="Urgenta (URG)" />
            <Field id="prm" label="Propunere (PRM)" />
            <Field id="nim" label="NIM" />
            <Field id="nid" label="NID" />
          </div>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>LUCRARI</h2>
          <Field id="lx" label="Lucrari executate" />
          <Field id="lp" label="Lucrari propuse" />
          <Field id="dc" label="Date complementare" />
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>COMPOZITIE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field id="tel" label="Compozitie TEL" />
            <Field id="sp1" label="Specie 1" />
            <Field id="sp2" label="Specie 2" />
            <Field id="sp3" label="Specie 3" />
            <Field id="sp4" label="Specie 4" />
            <Field id="sp5" label="Specie 5" />
            <Field id="sp6" label="Specie 6" />
            <Field id="sba" label="SBA" />
            <Field id="so" label="SO" />
            <Field id="mr" label="MR" />
            <Field id="ds" label="DS" />
          </div>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>SEMINTIS UTILIZABIL</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field id="vs" label="Varsta medie (VS)" />
            <Field id="vs_sp1" label="Specie 1" />
            <Field id="vs_sp2" label="Specie 2" />
            <Field id="vs_sp3" label="Specie 3" />
            <Field id="vs_sp4" label="Specie 4" />
            <Field id="vs_sp5" label="Specie 5" />
            <Field id="vs_sp6" label="Specie 6" />
            <Field id="soc" label="SOC" />
            <Field id="rs" label="RS" />
            <Field id="nrs" label="NRS" />
          </div>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>ELEMENTE TEHNICE</h2>
          {elemente.map((el, index) => (
            <div key={index} style={{ border: '1px solid #aaa', borderRadius: '6px', padding: '10px', marginBottom: '10px', background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <strong>Rand {index + 1}</strong>
                <button type="button" onClick={() => stergeRand(index)}
                  style={{ ...btnStyle, background: '#e74c3c', color: '#fff', padding: '6px 12px', margin: '0' }}>
                  Sterge
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 10px' }}>
                {[
                  ['elem', 'Elem'], ['mrg', 'MRG'], ['varsta', 'Varsta'],
                  ['prop', 'Prop (%)'], ['diametru', 'Diametru (cm)'], ['inaltime', 'Inaltime (m)'],
                  ['m', 'M'], ['ams', 'AMS'], ['elg', 'ELG'],
                  ['vit', 'VIT'], ['cal', 'Cal'], ['crest', 'Crestere'],
                  ['volum', 'Volum (mc)'], ['pex', 'PEX'], ['provenienta', 'Provenienta'],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label style={{ ...labelStyle, fontSize: '12px' }}>{label}</label>
                    <input
                      name={name}
                      style={{ ...inputStyle, fontSize: '14px' }}
                      placeholder={label}
                      value={el[name]}
                      onChange={e => handleElementChange(e, index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button type="button" onClick={adaugaRand}
            style={{ ...btnStyle, background: '#27ae60', color: '#fff', width: '100%' }}>
            + Adauga specie
          </button>
        </div>

        <div style={{ textAlign: 'center', padding: '16px' }}>
          <button type="submit" style={{ ...btnStyle, background: '#2980b9', color: '#fff' }}>
            Salveaza fisa
          </button>
          <button type="button" onClick={incarcaFisa} style={{ ...btnStyle, background: '#8e44ad', color: '#fff' }}>
            Incarca fisa
          </button>
          <button type="button" onClick={exportPDF} style={{ ...btnStyle, background: '#c0392b', color: '#fff' }}>
            Export PDF
          </button>
        </div>

      </form>
    </div>
  );
};

export default App;
