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

// 🔹 Salvează fișa local în browser
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
  alert("✅ Fișa a fost salvată local!");
});

// 🔹 Descărcă fișa ASCII ca fișier .txt
function downloadAscii(asciiText, filename = "fisa_silvica.txt") {
  const blob = new Blob([asciiText], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 🔹 Generează fișa ASCII și o descarcă
function genereazaAscii() {
  const get = id => document.getElementById(id)?.value || "-";
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

  const filename = `fisa_UP${get("up")}_UA${get("ua")}.txt`;
  downloadAscii(ascii, filename);
}

// 🔹 Exportă fișa ca PDF
function exportPDF() {
  const form = document.getElementById("fisaForm");
  html2canvas(form).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("fisa_silvica.pdf");
  });
}
