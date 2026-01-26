import React, { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const App = () => {
  const [formData, setFormData] = useState({
    isj: '',
    os: '',
    up: '',
    ua: '',
    subparcela: '',
    suprafata: '',
    fond: '',
    tp: '',
    poluare: '',
    drum: '',
    distanta: '',
    str: '',
    cns: '',
    crt: '',
    reg: '',
    ta: '',
    fct: '',
    relief: '',
    cne: '',
    expo: '',
    in: '',
    alt_min: '',
    alt_max: '',
    sol: '',
    erz: '',
    flora: '',
    ts: '',
    inv: '',
    te: '',
    urg: '',
    prm: '',
    nim: '',
    nid: '',
    lx: '',
    lp: '',
    dc: '',
    tel: '',
    sp1: '',
    sp2: '',
    sp3: '',
    sp4: '',
    sp5: '',
    sp6: '',
    sba: '',
    so: '',
    mr: '',
    ds: '',
    vs: '',
    vs_sp1: '',
    vs_sp2: '',
    vs_sp3: '',
    vs_sp4: '',
    vs_sp5: '',
    vs_sp6: '',
    soc: '',
    rs: '',
    nrs: '',
  });

  const [elemente, setElemente] = useState([]);

  const adaugaRand = () => {
    setElemente(prevElemente => [...prevElemente, { 
      elem: '', mrg: '', varsta: '', prop: '', diametru: '', inaltime: '', m: '', ams: '', elg: '', vit: '', cal: '', crest: '', volum: '', pex: '', provenienta: ''
    }]);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleElementChange = (e, index) => {
    const { name, value } = e.target;
    const newElemente = [...elemente];
    newElemente[index] = {
      ...newElemente[index],
      [name]: value
    };
    setElemente(newElemente);
  };
  
  const get = (id) => formData[id] || '-';

  const genereazaAsciiText = () => {
    const p = (str, len) => String(str).padEnd(len);
    let ascii = '';
    
    const buildSection = (title, fields) => {
        let sectionAscii = title + '\n';
        const content = fields.join(' | ');
        sectionAscii += content + '\n';
        sectionAscii += '─'.repeat(content.length) + '\n\n';
        return sectionAscii;
    };

    ascii += `🌲 FIȘĂ TEREN - Subparcelă: ${get('subparcela')} / UP: ${get('up')} / UA: ${get('ua')}\n`;
    ascii += '─'.repeat(`🌲 FIȘĂ TEREN - Subparcelă: ${get('subparcela')} / UP: ${get('up')} / UA: ${get('ua')}`.length) + '\n\n';

    ascii += buildSection('📍 IDENTIFICARE', [
        `ISJ: ${get('isj')}`, `OS: ${get('os')}`, `UP: ${get('up')}`, `UA: ${get('ua')}`, `Subparcelă: ${get('subparcela')}`,
        `Suprafață: ${get('suprafata')} ha`, `Fond: ${get('fond')}`, `TP: ${get('tp')}`, `Poluare: ${get('poluare')}`, `Drum: ${get('drum')}`,
        `Distanță: ${get('distanta')} m`, `STR: ${get('str')}`, `CNS: ${get('cns')}`, `CRT: ${get('crt')}`, `REG: ${get('reg')}`, `TA: ${get('ta')}`
    ]);

    ascii += buildSection('🌱 STAȚIUNE', [
        `FCT: ${get('fct')}`, `Relief: ${get('relief')}`, `CNE: ${get('cne')}`, `Expoziție: ${get('expo')}`, `IN: ${get('in')}`,
        `Alt min: ${get('alt_min')}`, `Alt max: ${get('alt_max')}`, `Sol: ${get('sol')}`, `Eroziune: ${get('erz')}`,
        `Flora: ${get('flora')}`, `TS: ${get('ts')}`
    ]);

    ascii += buildSection('🧪 INVENTAR', [
        `TE: ${get('te')}`, `URG: ${get('urg')}`, `PRM: ${get('prm')}`, `NIM: ${get('nim')}`, `NID: ${get('nid')}`
    ]);

    ascii += buildSection('🛠️ LUCRĂRI', [
        `Executate: ${get('lx')}`, `Propuse: ${get('lp')}`, `Date complementare: ${get('dc')}`
    ]);

    ascii += buildSection('🔧 COMPOZIȚIE', [
        `TEL: ${get('tel')}`, `SP1: ${get('sp1')}`, `SP2: ${get('sp2')}`, `SP3: ${get('sp3')}`, `SP4: ${get('sp4')}`, `SP5: ${get('sp5')}`, `SP6: ${get('sp6')}`,
        `SBA: ${get('sba')}`, `SO: ${get('so')}`, `MR: ${get('mr')}`, `DS: ${get('ds')}`
    ]);

    ascii += buildSection('🔧 SEMINȚIȘ UTILIZABIL', [
        `VS: ${get('vs')}`, `SP1: ${get('vs_sp1')}`, `SP2: ${get('vs_sp2')}`, `SP3: ${get('vs_sp3')}`, `SP4: ${get('vs_sp4')}`, `SP5: ${get('vs_sp5')}`, `SP6: ${get('vs_sp6')}`,
        `SOC: ${get('soc')}`, `RS: ${get('rs')}`, `NRS: ${get('nrs')}`
    ]);

    ascii += '🔩 ELEMENTE TEHNICE\n';
    const h_elem_array = ['Elem', 'MRG', 'Vârstă', 'Prop', 'Diametru', 'Înălțime', 'M', 'AMS', 'ELG', 'VIT', 'Cal', 'Creșt', 'Volum', 'PEX', 'Prov'];
    const elem_pads = [4, 4, 6, 5, 8, 8, 2, 4, 4, 4, 4, 5, 5, 4, 5];
    
    const h_elem = h_elem_array.map((h, i) => p(h, elem_pads[i])).join(' | ');
    ascii += h_elem + '\n';
    ascii += '─'.repeat(h_elem.length) + '\n';

    if (elemente.length > 0) {
        elemente.forEach(row => {
            const d_elem_array = [
                row.elem || '-', row.mrg || '-', row.varsta || '-', row.prop || '-',
                row.diametru || '-', row.inaltime || '-', row.m || '-', row.ams || '-',
                row.elg || '-', row.vit || '-', row.cal || '-', row.crest || '-',
                row.volum || '-', row.pex || '-', row.provenienta || '-'
            ];
            const d_elem = d_elem_array.map((d, i) => p(d, elem_pads[i])).join(' | ');
            ascii += d_elem + '\n';
        });
    } else {
        ascii += 'Niciun element tehnic adăugat.\n';
    }
    ascii += '─'.repeat(h_elem.length) + '\n';

    return ascii;
  };

  const downloadAscii = (asciiText, filename = "fisa_silvica.txt") => {
    const blob = new Blob([asciiText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const genereazaAscii = () => {
    const ascii = genereazaAsciiText();
    const filename = `fisa_UP${get("up")}_UA${get("ua")}_SP${get("subparcela")}.txt`;
    downloadAscii(ascii, filename);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    
    doc.text(`FIȘĂ TEREN - Subparcelă: ${get('subparcela')} / UP: ${get('up')} / UA: ${get('ua')}`, 14, 15);

    let finalY = 20;

    finalY = autoTable(doc, { 
        startY: finalY, 
        head: [[{ content: '📍 IDENTIFICARE', colSpan: 6, styles: { halign: 'center', fillColor: [22, 160, 133] } }]],
        body: [
            [ `ISJ: ${get('isj')}`, `OS: ${get('os')}`, `UP: ${get('up')}`, `UA: ${get('ua')}`, `Subparcelă: ${get('subparcela')}`],
            [ `Suprafață: ${get('suprafata')} ha`, `Fond: ${get('fond')}`, `TP: ${get('tp')}`, `Poluare: ${get('poluare')}`, `Drum: ${get('drum')}`],
            [ `Distanță: ${get('distanta')} m`, `STR: ${get('str')}`, `CNS: ${get('cns')}`, `CRT: ${get('crt')}`, `REG: ${get('reg')}`, `TA: ${get('ta')}`]
        ],
        theme: 'grid',
        didDrawPage: (data) => {
            finalY = data.cursor.y;
        }
    });

    finalY = autoTable(doc, { 
        startY: finalY + 5,
        head: [[{ content: '🌱 STAȚIUNE', colSpan: 6, styles: { halign: 'center', fillColor: [22, 160, 133] } }]],
        body: [
            [ `FCT: ${get('fct')}`, `Relief: ${get('relief')}`, `CNE: ${get('cne')}`, `Expoziție: ${get('expo')}`, `IN: ${get('in')}`],
            [ `Alt min: ${get('alt_min')}`, `Alt max: ${get('alt_max')}`, `Sol: ${get('sol')}`, `Eroziune: ${get('erz')}`],
            [ `Flora: ${get('flora')}`, `TS: ${get('ts')}`]
        ],
        theme: 'grid',
        didDrawPage: (data) => {
            finalY = data.cursor.y;
        }
    });
    
    finalY = autoTable(doc, { 
        startY: finalY + 5,
        head: [[{ content: '🧪 INVENTAR', colSpan: 6, styles: { halign: 'center', fillColor: [22, 160, 133] } }]],
        body: [
            [`An inventar: ${get('inv')}`, `TE: ${get('te')}`, `URG: ${get('urg')}`, `PRM: ${get('prm')}`, `NIM: ${get('nim')}`, `NID: ${get('nid')}`]
        ],
        theme: 'grid',
        didDrawPage: (data) => {
            finalY = data.cursor.y;
        }
    });

    finalY = autoTable(doc, {
        startY: finalY + 5,
        head: [[{ content: '🛠️ LUCRĂRI', colSpan: 3, styles: { halign: 'center', fillColor: [22, 160, 133] } }]],
        body: [
            [`Executate: ${get('lx')}`, `Propuse: ${get('lp')}`, `Date complementare: ${get('dc')}`]
        ],
        theme: 'grid',
        didDrawPage: (data) => {
            finalY = data.cursor.y;
        }
    });

    finalY = autoTable(doc, {
        startY: finalY + 5,
        head: [[{ content: '🔧 COMPOZIȚIE', colSpan: 7, styles: { halign: 'center', fillColor: [22, 160, 133] } }]],
        body: [
            [`TEL: ${get('tel')}`, `SP1: ${get('sp1')}`, `SP2: ${get('sp2')}`, `SP3: ${get('sp3')}`, `SP4: ${get('sp4')}`, `SP5: ${get('sp5')}`, `SP6: ${get('sp6')}`],
            [`SBA: ${get('sba')}`, `SO: ${get('so')}`, `MR: ${get('mr')}`, `DS: ${get('ds')}`]
        ],
        theme: 'grid',
        didDrawPage: (data) => {
            finalY = data.cursor.y;
        }
    });
    
    finalY = autoTable(doc, {
        startY: finalY + 5,
        head: [[{ content: '🔧 SEMINȚIȘ UTILIZABIL', colSpan: 7, styles: { halign: 'center', fillColor: [22, 160, 133] } }]],
        body: [
            [`VS: ${get('vs')}`, `SP1: ${get('vs_sp1')}`, `SP2: ${get('vs_sp2')}`, `SP3: ${get('vs_sp3')}`, `SP4: ${get('vs_sp4')}`, `SP5: ${get('vs_sp5')}`, `SP6: ${get('vs_sp6')}`],
            [`SOC: ${get('soc')}`, `RS: ${get('rs')}`, `NRS: ${get('nrs')}`]
        ],
        theme: 'grid',
        didDrawPage: (data) => {
            finalY = data.cursor.y;
        }
    });

    autoTable(doc, {
        startY: finalY + 5,
        head: [[{ content: '🔩 ELEMENTE TEHNICE', colSpan: 15, styles: { halign: 'center', fillColor: [22, 160, 133] } }]],
        theme: 'grid',
        didDrawPage: (data) => {
            finalY = data.cursor.y;
        }
    });

    autoTable(doc, {
        startY: finalY,
        head: [['Elem', 'MRG', 'Vârstă', 'Prop', 'Diametru', 'Înălțime', 'M', 'AMS', 'ELG', 'VIT', 'Cal', 'Creșt', 'Volum', 'PEX', 'Prov']],
        body: elemente.map(el => [el.elem, el.mrg, el.varsta, el.prop, el.diametru, el.inaltime, el.m, el.ams, el.elg, el.vit, el.cal, el.crest, el.volum, el.pex, el.provenienta]),
        theme: 'grid'
    });

    doc.save(`fisa_UP${get("up")}_UA${get("ua")}_SP${get("subparcela")}.pdf`);
  };


  const handleSave = (e) => {
    e.preventDefault();
    const fisa = { ...formData, elemente };
    localStorage.setItem("fisa_" + fisa.subparcela, JSON.stringify(fisa));
    const blob = new Blob([JSON.stringify(fisa, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    const filename = `fisa_UP${fisa.up}_UA${fisa.ua}_SP${fisa.subparcela}.json`;
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert("✅ Fișa a fost salvată local și descărcată!");
  };

  return (
    <div>
      <h1>🌲 Fișă Silvică – Versiunea 1.0</h1>
      <form id="fisaForm" onSubmit={handleSave}>
        <h2>📍 Identificare</h2>
        <input id="isj" placeholder="ISJ" value={formData.isj} onChange={handleFormChange} />
        <input id="os" placeholder="OS" value={formData.os} onChange={handleFormChange} />
        <input id="up" placeholder="UP" value={formData.up} onChange={handleFormChange} />
        <input id="ua" placeholder="UA" value={formData.ua} onChange={handleFormChange} />
        <input id="subparcela" placeholder="Subparcelă" value={formData.subparcela} onChange={handleFormChange} />
        <input id="suprafata" placeholder="Suprafață (ha)" value={formData.suprafata} onChange={handleFormChange} />
        <input id="fond" placeholder="Fond Funciar" value={formData.fond} onChange={handleFormChange} />
        <input id="tp" placeholder="Tip Pădure (TP)" value={formData.tp} onChange={handleFormChange} />
        <input id="poluare" placeholder="Poluare" value={formData.poluare} onChange={handleFormChange} />
        <input id="drum" placeholder="Drum" value={formData.drum} onChange={handleFormChange} />
        <input id="distanta" placeholder="Distanță (m)" value={formData.distanta} onChange={handleFormChange} />
        <input id="str" placeholder="STR" value={formData.str} onChange={handleFormChange} />
        <input id="cns" placeholder="CNS" value={formData.cns} onChange={handleFormChange} />
        <input id="crt" placeholder="CRT" value={formData.crt} onChange={handleFormChange} />
        <input id="reg" placeholder="Regim (REG)" value={formData.reg} onChange={handleFormChange} />
        <input id="ta" placeholder="Vârstă actuală (TA)" value={formData.ta} onChange={handleFormChange} />

        <h2>🌱 Stațiune</h2>
        <input id="fct" placeholder="Funcționalitate (FCT)" value={formData.fct} onChange={handleFormChange} />
        <input id="relief" placeholder="Relief" value={formData.relief} onChange={handleFormChange} />
        <input id="cne" placeholder="CNE" value={formData.cne} onChange={handleFormChange} />
        <input id="expo" placeholder="Expoziție" value={formData.expo} onChange={handleFormChange} />
        <input id="in" placeholder="IN" value={formData.in} onChange={handleFormChange} />
        <input id="alt_min" placeholder="Altitudine minimă" value={formData.alt_min} onChange={handleFormChange} />
        <input id="alt_max" placeholder="Altitudine maximă" value={formData.alt_max} onChange={handleFormChange} />
        <input id="sol" placeholder="Sol" value={formData.sol} onChange={handleFormChange} />
        <input id="erz" placeholder="Eroziune" value={formData.erz} onChange={handleFormChange} />
        <input id="flora" placeholder="Flora" value={formData.flora} onChange={handleFormChange} />
        <input id="ts" placeholder="Tip Stațiune (TS)" value={formData.ts} onChange={handleFormChange} />

        <h2>🧪 Inventar</h2>
        <input id="inv" placeholder="An inventar" value={formData.inv} onChange={handleFormChange} />
        <input id="te" placeholder="Vârstă exploatare (TE)" value={formData.te} onChange={handleFormChange} />
        <input id="urg" placeholder="Urgență (URG)" value={formData.urg} onChange={handleFormChange} />
        <input id="prm" placeholder="Propunere (PRM)" value={formData.prm} onChange={handleFormChange} />
        <input id="nim" placeholder="NIM" value={formData.nim} onChange={handleFormChange} />
        <input id="nid" placeholder="NID" value={formData.nid} onChange={handleFormChange} />

        <h2>🛠️ Lucrări</h2>
        <input id="lx" placeholder="Lucrări executate" value={formData.lx} onChange={handleFormChange} />
        <input id="lp" placeholder="Lucrări propuse" value={formData.lp} onChange={handleFormChange} />
        <input id="dc" placeholder="Date complementare" value={formData.dc} onChange={handleFormChange} />

        <h2>🔧 Compoziție</h2>
        <input id="tel" placeholder="Compoziție TEL" value={formData.tel} onChange={handleFormChange} />
        <input id="sp1" placeholder="Specie 1" value={formData.sp1} onChange={handleFormChange} />
        <input id="sp2" placeholder="Specie 2" value={formData.sp2} onChange={handleFormChange} />
        <input id="sp3" placeholder="Specie 3" value={formData.sp3} onChange={handleFormChange} />
        <input id="sp4" placeholder="Specie 4" value={formData.sp4} onChange={handleFormChange} />
        <input id="sp5" placeholder="Specie 5" value={formData.sp5} onChange={handleFormChange} />
        <input id="sp6" placeholder="Specie 6" value={formData.sp6} onChange={handleFormChange} />
        <input id="sba" placeholder="SBA" value={formData.sba} onChange={handleFormChange} />
        <input id="so" placeholder="SO" value={formData.so} onChange={handleFormChange} />
        <input id="mr" placeholder="MR" value={formData.mr} onChange={handleFormChange} />
        <input id="ds" placeholder="DS" value={formData.ds} onChange={handleFormChange} />

        <h2>🔧 Semințiș Utilizabil</h2>
        <input id="vs" placeholder="Vârsta medie (VS)" value={formData.vs} onChange={handleFormChange} />
        <input id="vs_sp1" placeholder="Specie 1" value={formData.vs_sp1} onChange={handleFormChange} />
        <input id="vs_sp2" placeholder="Specie 2" value={formData.vs_sp2} onChange={handleFormChange} />
        <input id="vs_sp3" placeholder="Specie 3" value={formData.vs_sp3} onChange={handleFormChange} />
        <input id="vs_sp4" placeholder="Specie 4" value={formData.vs_sp4} onChange={handleFormChange} />
        <input id="vs_sp5" placeholder="Specie 5" value={formData.vs_sp5} onChange={handleFormChange} />
        <input id="vs_sp6" placeholder="Specie 6" value={formData.vs_sp6} onChange={handleFormChange} />
        <input id="soc" placeholder="SOC" value={formData.soc} onChange={handleFormChange} />
        <input id="rs" placeholder="RS" value={formData.rs} onChange={handleFormChange} />
        <input id="nrs" placeholder="NRS" value={formData.nrs} onChange={handleFormChange} />

        <h2>🔩 Elemente Tehnice</h2>
        <div id="elementeContainer">
          {elemente.map((el, index) => (
            <div key={index} className="element-tehnic">
              <input name="elem" placeholder="Elem" value={el.elem} onChange={e => handleElementChange(e, index)} />
              <input name="mrg" placeholder="MRG" value={el.mrg} onChange={e => handleElementChange(e, index)} />
              <input name="varsta" placeholder="Vârstă" value={el.varsta} onChange={e => handleElementChange(e, index)} />
              <input name="prop" placeholder="Prop (%s)" value={el.prop} onChange={e => handleElementChange(e, index)} />
              <input name="diametru" placeholder="Diametru (cm)" value={el.diametru} onChange={e => handleElementChange(e, index)} />
              <input name="inaltime" placeholder="Înălțime (m)" value={el.inaltime} onChange={e => handleElementChange(e, index)} />
              <input name="m" placeholder="M" value={el.m} onChange={e => handleElementChange(e, index)} />
              <input name="ams" placeholder="AMS" value={el.ams} onChange={e => handleElementChange(e, index)} />
              <input name="elg" placeholder="ELG" value={el.elg} onChange={e => handleElementChange(e, index)} />
              <input name="vit" placeholder="VIT" value={el.vit} onChange={e => handleElementChange(e, index)} />
              <input name="cal" placeholder="Cal" value={el.cal} onChange={e => handleElementChange(e, index)} />
              <input name="crest" placeholder="Creștere (mc/ha/an)" value={el.crest} onChange={e => handleElementChange(e, index)} />
              <input name="volum" placeholder="Volum (mc)" value={el.volum} onChange={e => handleElementChange(e, index)} />
              <input name="pex" placeholder="PEX" value={el.pex} onChange={e => handleElementChange(e, index)} />
              <input name="provenienta" placeholder="Proveniență" value={el.provenienta} onChange={e => handleElementChange(e, index)} />
            </div>
          ))}
        </div>
        <button type="button" onClick={adaugaRand}>➕ Adaugă specie</button>
        <br /><br />
        <button type="submit">💾 Salvează fișa</button>
        <button type="button" onClick={genereazaAscii}>📄 Generează ASCII</button>
        <button type="button" onClick={exportPDF}>🧾 Export PDF</button>
      </form>
    </div>
  );
};

export default App;
