function esteUAValida(ua) {
  return /^[0-9]{1,4}\s?[A-Z]?$/.test(ua.trim());
}

function genereazaFisaUA() {
  const ua = document.getElementById("uaID").value.trim();
  if (!esteUAValida(ua)) {
    alert("❌ Format U.A. invalid");
    return;
  }

  const fisa = `
──────────────────────────────────────────────
🧾 Fișă UA
──────────────────────────────────────────────
📌 U.A.: ${ua}
🌲 Specie: Molid
📅 Vârstă: 45 ani
📏 Diametru: 38 cm
📐 Înălțime: 27.5 m
🌱 Proveniență: Regenerare naturală
💚 Vitalitate: Normală
🎯 Țel gospodărire: Codru regulat
──────────────────────────────────────────────
`;

  document.getElementById("fisaContent").textContent = fisa;
  document.getElementById("fisaUA").style.display = "block";
}

function genereazaFiseMultiple() {
  const lista = document.getElementById("listaUA").value.split(",");
  let fise = "";

  lista.forEach(rawUA => {
    const ua = rawUA.trim();
    if (!esteUAValida(ua)) {
      fise += `❌ U.A. invalidă: "${ua}"\n`;
      return;
    }

    fise += `
──────────────────────────────────────────────
🧾 Fișă UA
──────────────────────────────────────────────
📌 U.A.: ${ua}
🌲 Specie: Molid
📅 Vârstă: 45 ani
📏 Diametru: 38 cm
📐 Înălțime: 27.5 m
🌱 Proveniență: Regenerare naturală
💚 Vitalitate: Normală
🎯 Țel gospodărire: Codru regulat
──────────────────────────────────────────────
`;
  });

  document.getElementById("fisaContent").textContent = fise;
  document.getElementById("fisaUA").style.display = "block";
}

function exportaPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const text = document.getElementById("fisaContent").textContent;
  const pagini = text.split("──────────────────────────────────────────────").filter(p => p.trim());

  pagini.forEach((pagina, index) => {
    if (index > 0) doc.addPage();
    doc.text(pagina.trim(), 10, 10);
  });

  doc.save("fise_arboret.pdf");
}

function exportaExcel() {
  const lista = document.getElementById("listaUA").value.split(",");
  const rows = [];

  lista.forEach(rawUA => {
    const ua = rawUA.trim();
    if (!esteUAValida(ua)) return;

    rows.push({
      "UA": ua,
      "Specie": "Molid",
      "Vârstă": 45,
      "Diametru": 38,
      "Înălțime": 27.5,
      "Proveniență": "Regenerare naturală",
      "Vitalitate": "Normală",
      "Țel gospodărire": "Codru regulat"
    });
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, "Fișe UA");
  XLSX.writeFile(wb, "fise_arboret.xlsx");
}