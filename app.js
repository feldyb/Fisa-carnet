// 🔹 Adaugă un rând de element tehnic
function adaugaRand() {
  const container = document.getElementById("elementeContainer");
  const div = document.createElement("div");
  div.className = "element-tehnic";
  div.innerHTML = `
    <input placeholder="Elem" />
    <input placeholder="MRG" />
    <input placeholder="Vârstă" />
    <input placeholder="Prop (%)" />
    <input placeholder="Diametru (cm)" />
    <input placeholder="Înălțime (m)" />
    <input placeholder="M" />
    <select><option>DA</option><option>NU</option></select>
    <input placeholder="ELG" />
    <select><option>bun</option><option>med</option><option>slab</option></select>
    <select><option>A</option><option>B</option><option>C</option></select>
    <input placeholder="Creștere (mc/ha/an)" />
    <input placeholder="Volum (mc)" />
    <input placeholder="PEX" />
    <input placeholder="Proveniență" />
  `;
  container.appendChild(div);
}

// 🔹 Preia valoarea unui câmp
function get(id) {
  return document.getElementById(id)?.value || "-";
}

// 🔹 Generează fișa ASCII ca text
function genereazaAsciiText() {
  let ascii = `────────────────────────────────────────────\n`;
  ascii += `🌲 FIȘĂ TEREN – Subparcelă ${get("subparcela")} / UP${get("up")} / UA${get("ua")}\n`;
  ascii += `────────────────────────────────────────────\n\n`;

  ascii += `📍 IDENTIFICARE\nISJ: ${get("isj")}\nOS: ${get("os")}\nUP: ${get("up")}\nUA: ${get("ua")}\nSubparcelă: ${get("subparcela")}\nSuprafață: ${get("suprafata")} ha\nFond: ${get("fond")}\nTP: ${get("tp")}\nAltitudine: ${get("altitudine")} m\nSTR: ${get("str")}\nCNS: ${get("cns")}\nCRT: ${get("crt")}\nREG: ${get("reg")}\nTA: ${get("ta")}\n\n`;

  ascii += `🌱 STAȚIUNE\nFCT: ${get("fct")}\nRelief: ${get("relief")}\nCNE: ${get("cne")}\nExpoziție: ${get("expo")}\nIN: ${get("in")}\nAlt min: ${get("alt_min")}\nAlt max: ${get("alt_max")}\nSol: ${get("sol")}\nEroziune: ${get("erz")}\nFlora: ${get("flora")}\nTS: ${get("ts")}\n\n`;

  ascii += `🧪 INVENTAR\nAn: ${get("inv")}\nTE: ${get("te")}\nURG: ${get("urg")}\nPRM: ${get("prm")}\nNIM: ${get("nim")}\nNID: ${get("nid")}\n\n`;

  ascii += `🛠️ LUCRĂRI\nExecutate: ${get("lx")}\nPropuse: ${get("lp")}\nDate complementare: ${get("dc")}\n\n`;

  ascii += `🌿 SUBARBORET\nSBA: ${get("sba")}\nMS: ${get("ms")}%\nSeminiș: ${get("seminis")}%\nIP: ${get("ip")} mc/ha/an\n%SUPR: ${get("supr")}\n\n`;

  ascii += `🔧 COMPOZIȚIE\nTEL: ${get("tel")}\nSP1: ${get("sp1")}\nSP2: ${get("sp2")}\nSP3: ${get("sp3")}\nSP4: ${get("sp4")}\nSP5: ${get("sp5")}\nSP6: ${get("sp6")}\nSOC: ${get("soc")}\nRS: ${get("rs")}\nNRS: ${get("nrs")}\nVS: ${get("vs")}\n\n`;

  ascii += `🔩 ELEMENTE TEHNICE\nElem | MRG | Vârstă | Prop | Diametru | Înălțime | M | AMS | ELG | VIT | Cal | Creșt | Volum | PEX | Prov\n`;
  ascii += `─────┼─────┼────────┼──────┼──────────┼──────────┼──┼─────┼─────┼─────┼─────┼────────┼────────┼─────┼───────\n`;

  const randuri = document.querySelectorAll(".element-tehnic");
  randuri.forEach(row => {
    const inputs = row.querySelectorAll("input, select");
    const valori = Array.from(inputs).map(i => i.value || "-");
    ascii += valori.join(" | ") + "\n";
  });

  ascii += `\n────────────────────────────────────────────\n📄 Fișa generată automat – Versiunea 1.0\n`;
  return ascii;
}

// 🔹 Descărcă fișa ASCII ca .txt
function downloadAscii(asciiText, filename = "fisa_silvica.txt") {
  const blob = new Blob([asciiText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 🔹 Generează și descarcă fișa ASCII
function genereazaAscii() {
  const ascii = genereazaAsciiText();
  const filename = `fisa_UP${get("up")}_UA${get("ua")}_SP${get("subparcela")}.txt`;
  downloadAscii(ascii, filename);
}

// 🔹 Generează și descarcă fișa ca PDF (din ASCII)
function exportPDF() {
  const ascii = genereazaAsciiText();
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");
  const lines = pdf.splitTextToSize(ascii, 180);
  pdf.setFont("Courier", "normal");
  pdf.setFontSize(10);
  pdf.text(lines, 10, 20);
  const filename = `fisa_UP${get("up")}_UA${get("ua")}_SP${get("subparcela")}.pdf`;
  pdf.save(filename);
}

// 🔹 Exportă mai multe fișe ASCII într-un singur PDF
function exportPDFMultiplu(fiseArray) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");

  fiseArray.forEach((ascii, index) => {
    const lines = pdf.splitTextToSize(ascii, 180);
    pdf.setFont("Courier", "normal");
    pdf.setFontSize(10);
    if (index > 0) pdf.addPage();
    pdf.text(lines, 10, 20);
  });

  pdf.save("fise_silvice_multiple.pdf");
}

// 🔹 Salvează fișa local și o descarcă ca JSON
document.getElementById("fisaForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = new FormData(this);
  const fisa = {};
  for (let [key, value] of data.entries()) {
    fisa[key] = value;
  }

  const randuri = document.querySelectorAll(".element-tehnic");
  fisa.elemente = [];
  randuri.forEach(row => {
    const inputs = row.querySelectorAll("input, select");
    const valori = Array.from(inputs).map(i => i.value || "-");
    fisa.elemente.push(valori);
  });

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
});
