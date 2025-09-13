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