// 🔹 Adaugă un rând nou în secțiunea Elemente Tehnice
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
    <select><option>DA</option><option>NU</option></select> <!-- AMS -->
    <input placeholder="ELG" />
    <select><option>bun</option><option>med</option><option>slab</option></select> <!-- VIT -->
    <select><option>A</option><option>B</option><option>C</option></select> <!-- Calitate -->
    <input placeholder="Creștere (mc/ha/an)" />
    <input placeholder="Volum (mc)" />
    <input placeholder="PEX" />
    <input placeholder="Proveniență" />
  `;
  container.appendChild(div);
}

// 🔹 Salvează fișa completată în localStorage
document.getElementById("fisaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(this);
  const fisa = {};
  for (let [key, value] of data.entries()) {
    fisa[key] = value;
  }

  // Salvăm și elementele tehnice
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

// 🔹 Generează fișa ASCII completă
function genereazaAscii() {
  const get = id => document.getElementById(id)?.value || "-";
  let ascii = `────────────────────────────────────────────\n`;
  ascii += `🌲 FIȘĂ TEREN – Subparcelă ${get("subparcela")} / UP${get("up")} / UA${get("ua")}\n`;
  ascii += `────────────────────────────────────────────\n\n`;

  ascii += `📍 IDENTIFICARE\n`;
  ascii += `ISJ: ${get("isj")}\nOS: ${get("os")}\nUP: ${get("up")}\nUA: ${get("ua")}\nSubparcelă: ${get("subparcela")}\nSuprafață: ${get("suprafata")} ha\nFond Funciar: ${get("fond")}\n\n`;

  ascii += `🌱 STAȚIUNE\n`;
  ascii += `TS: ${get("ts")}\nRelief: ${get("relief")}\nExpoziție: ${get("expo")}\nAltitudine: ${get("altitudine")} m\nSol: ${get("sol")}\nFlora: ${get("flora")}\n\n`;

  ascii += `🌲 COMPOZIȚIE\n`;
  ascii += `TP: ${get("tip_padure")}\nTEL: ${get("tel")}\nSubarboret: ${get("subarboret")}\nSeminiș utilizabil: ${get("seminis")}%\nVolum/ha: ${get("volum_ha")} mc\nCreștere: ${get("crestere")} mc/ha/an\n\n`;

  ascii += `🛠️ LUCRĂRI\n`;
  ascii += `Executate: ${get("lx")}\nPropuse: ${get("lp")}\nUrgent: ${get("urg")}\nNIM: ${get("nim")}\nNID: ${get("nid")}\n\n`;

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

  // Afișare în consolă
  console.log(ascii);
  alert("📄 Fișa ASCII a fost generată! Verifică consola.");
}