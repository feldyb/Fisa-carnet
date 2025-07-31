document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("silvic-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nume = document.getElementById("nume").value.trim();
    const specie = document.getElementById("specie").value.trim();
    const inaltime = parseFloat(document.getElementById("inaltime").value);
    const diametru = parseFloat(document.getElementById("diametru").value);
    const tip = document.getElementById("tip").value;

    if (!nume || !specie || isNaN(inaltime) || isNaN(diametru)) {
      alert("Te rog să completezi toate câmpurile corect.");
      return;
    }

    const arbore = {
      nume,
      specie,
      inaltime,
      diametru,
      tip,
    };

    console.log("Date salvate:", arbore);
    alert("Datele au fost salvate cu succes!");
    form.reset();
  });
});
