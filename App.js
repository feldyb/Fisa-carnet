
import React, { useState } from 'react';
import jsPDF from 'jspdf';

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
    sba: '',
    ms: '',
    seminis: '',
    ip: '',
    supr: '',
    tel: '',
    sp1: '',
    sp2: '',
    sp3: '',
    sp4: '',
    sp5: '',
    sp6: '',
    soc: '',
    rs: '',
    nrs: '',
    vs: '',
  });

  const [elemente, setElemente] = useState([]);

  const adaugaRand = () => {
    setElemente([...elemente, { 
      elem: '', mrg: '', varsta: '', prop: '', diametru: '', inaltime: '', m: '', ams: 'DA', elg: '', vit: 'bun', cal: 'A', crest: '', volum: '', pex: '', provenienta: ''
    }]);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleElementChange = (e, index) => {
    const newElemente = [...elemente];
    newElemente[index][e.target.name] = e.target.value;
    setElemente(newElemente);
  };
  
  const get = (id) => formData[id] || '-';

  const genereazaAsciiText = () => {
    let ascii = `────────────────────────────────────────────\n`;
    ascii += `🌲 FIȘĂ TEREN – Subparcelă ${get("subparcela")} / UP${get("up")} / UA${get("ua")}\n`;
    ascii += `────────────────────────────────────────────\n\n`;
    ascii += `📍 IDENTIFICARE\nISJ: ${get("isj")}\nOS: ${get("os")}\nUP: ${get("up")}\nUA: ${get("ua")}\nSubparcelă: ${get("subparcela")}\nSuprafață: ${get("suprafata")} ha\nFond: ${get("fond")}\nTP: ${get("tp")}\nPoluare: ${get("poluare")}\nDrum: ${get("drum")}\nDistanță: ${get("distanta")} m\nSTR: ${get("str")}\nCNS: ${get("cns")}\nCRT: ${get("crt")}\nREG: ${get("reg")}\nTA: ${get("ta")}\n\n`;
    ascii += `🌱 STAȚIUNE\nFCT: ${get("fct")}\nRelief: ${get("relief")}\nCNE: ${get("cne")}\nExpoziție: ${get("expo")}\nIN: ${get("in")}\nAlt min: ${get("alt_min")}\nAlt max: ${get("alt_max")}\nSol: ${get("sol")}\nEroziune: ${get("erz")}\nFlora: ${get("flora")}\nTS: ${get("ts")}\n\n`;
    ascii += `🧪 INVENTAR\nAn: ${get("inv")}\nTE: ${get("te")}\nURG: ${get("urg")}\nPRM: ${get("prm")}\nNIM: ${get("nim")}\nNID: ${get("nid")}\n\n`;
    ascii += `🛠️ LUCRĂRI\nExecutate: ${get("lx")}\nPropuse: ${get("lp")}\nDate complementare: ${get("dc")}\n\n`;
    ascii += `🌿 SUBARBORET\nSBA: ${get("sba")}\nMS: ${get("ms")}%\nSeminiș: ${get("seminis")}%\nIP: ${get("ip")} mc/ha/an\n%SUPR: ${get("supr")}\n\n`;
    ascii += `🔧 COMPOZIȚIE\nTEL: ${get("tel")}\nSP1: ${get("sp1")}\nSP2: ${get("sp2")}\nSP3: ${get("sp3")}\nSP4: ${get("sp4")}\nSP5: ${get("sp5")}\nSP6: ${get("sp6")}\nSOC: ${get("soc")}\nRS: ${get("rs")}\nNRS: ${get("nrs")}\nVS: ${get("vs")}\n\n`;
    ascii += `🔩 ELEMENTE TEHNICE\nElem | MRG | Vârstă | Prop | Diametru | Înălțime | M | AMS | ELG | VIT | Cal | Creșt | Volum | PEX | Prov\n`;
    ascii += `─────┼─────┼────────┼──────┼──────────┼──────────┼──┼─────┼─────┼─────┼─────┼────────┼────────┼─────┼───────\n`;

    elemente.forEach(row => {
      const valori = Object.values(row).map(val => val || '-');
      ascii += valori.join(" | ") + "\n";
    });

    ascii += `\n────────────────────────────────────────────\n📄 Fișa generată automat – Versiunea 1.0\n`;
    return ascii;
  };

  const downloadAscii = (asciiText, filename = "fisa_silvica.txt") => {
    const blob = new Blob([asciiText], { type: "text/plain" });
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
    const ascii = genereazaAsciiText();
    const pdf = new jsPDF("p", "mm", "a4");
    const lines = pdf.splitTextToSize(ascii, 180);
    pdf.setFont("Courier", "normal");
    pdf.setFontSize(10);
    pdf.text(lines, 10, 20);
    const filename = `fisa_UP${get("up")}_UA${get("ua")}_SP${get("subparcela")}.pdf`;
    pdf.save(filename);
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

        <h2>🌿 Subarboret</h2>
        <input id="sba" placeholder="Subarboret (SBA)" value={formData.sba} onChange={handleFormChange} />
        <input id="ms" placeholder="MS (%)" value={formData.ms} onChange={handleFormChange} />
        <input id="seminis" placeholder="Seminiș utilizabil (%)" value={formData.seminis} onChange={handleFormChange} />
        <input id="ip" placeholder="Creștere mc/ha/an (IP)" value={formData.ip} onChange={handleFormChange} />
        <input id="supr" placeholder="%SUPR" value={formData.supr} onChange={handleFormChange} />

        <h2>🔧 Compoziție</h2>
        <input id="tel" placeholder="Compoziție TEL" value={formData.tel} onChange={handleFormChange} />
        <input id="sp1" placeholder="Specie 1" value={formData.sp1} onChange={handleFormChange} />
        <input id="sp2" placeholder="Specie 2" value={formData.sp2} onChange={handleFormChange} />
        <input id="sp3" placeholder="Specie 3" value={formData.sp3} onChange={handleFormChange} />
        <input id="sp4" placeholder="Specie 4" value={formData.sp4} onChange={handleFormChange} />
        <input id="sp5" placeholder="Specie 5" value={formData.sp5} onChange={handleFormChange} />
        <input id="sp6" placeholder="Specie 6" value={formData.sp6} onChange={handleFormChange} />
        <input id="soc" placeholder="SOC" value={formData.soc} onChange={handleFormChange} />
        <input id="rs" placeholder="RS" value={formData.rs} onChange={handleFormChange} />
        <input id="nrs" placeholder="NRS" value={formData.nrs} onChange={handleFormChange} />
        <input id="vs" placeholder="Vârsta medie (VS)" value={formData.vs} onChange={handleFormChange} />

        <h2>🔩 Elemente Tehnice</h2>
        <div id="elementeContainer">
          {elemente.map((el, index) => (
            <div key={index} className="element-tehnic">
              <input name="elem" placeholder="Elem" value={el.elem} onChange={e => handleElementChange(e, index)} />
              <input name="mrg" placeholder="MRG" value={el.mrg} onChange={e => handleElementChange(e, index)} />
              <input name="varsta" placeholder="Vârstă" value={el.varsta} onChange={e => handleElementChange(e, index)} />
              <input name="prop" placeholder="Prop (%)" value={el.prop} onChange={e => handleElementChange(e, index)} />
              <input name="diametru" placeholder="Diametru (cm)" value={el.diametru} onChange={e => handleElementChange(e, index)} />
              <input name="inaltime" placeholder="Înălțime (m)" value={el.inaltime} onChange={e => handleElementChange(e, index)} />
              <input name="m" placeholder="M" value={el.m} onChange={e => handleElementChange(e, index)} />
              <select name="ams" value={el.ams} onChange={e => handleElementChange(e, index)}>
                <option>DA</option>
                <option>NU</option>
              </select>
              <input name="elg" placeholder="ELG" value={el.elg} onChange={e => handleElementChange(e, index)} />
              <select name="vit" value={el.vit} onChange={e => handleElementChange(e, index)}>
                <option>bun</option>
                <option>med</option>
                <option>slab</option>
              </select>
              <select name="cal" value={el.cal} onChange={e => handleElementChange(e, index)}>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
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
