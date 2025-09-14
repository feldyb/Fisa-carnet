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

function genereazaAscii() {
  const get = id => document.getElementById(id)?.value || "-";
  let ascii = `────────────────────────────────────────────\n`;
  ascii += `🌲 FIȘĂ TEREN – Subparcelă ${get("subparcela")} / UP${get("up")} / UA${get("ua")}\n`;
  ascii += `────────────────────────────────────────────\n\n`;
  ascii += `📍 IDENTIFICARE\nISJ: ${get("isj")}\nOS: ${get("os")}\nUP: ${get("up")}\nUA: ${get("ua")}\nSubparcelă: ${get("subparcela")}\nSuprafață: ${get("suprafata")} ha\n\n`;

  ascii += `🔧 ELEMENTE TEHNICE\n`;
  ascii += `Elem | MRG | Vârstă | Prop | Diametru | Înălțime | M | AMS | ELG | VIT | Cal | Creșt | Volum | PEX | Prov\n`;
  ascii += `─────┼─────┼────────┼──────┼──────────┼──────────┼──┼─────┼─────┼─────┼─────┼────────┼────────┼─────┼───────\n`;

  const randuri = document.querySelectorAll(".element-tehnic");
  randuri.forEach(row => {
    const inputs = row.querySelectorAll("input, select");
    const valori = Array.from(inputs).map(i => i.value || "-");
    ascii += valori.join(" | ") + "\n";
  });

  ascii += `────────────────────────────────────────────\n📄 Fișa generată automat – Versiunea 1.0\n`;
  console.log(ascii);
  alert("📄 Fișa ASCII a fost generată! Verifică consola.");
}

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
