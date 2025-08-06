(function () {
  "use strict";

  const mixTable = document.getElementById("mixTable");
  const compTable = document.getElementById("compTable");

  function createCell(value, isInput = true) {
    const td = document.createElement("td");
    if (isInput) {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = value || "";
      input.setAttribute("aria-label", value || "valoare");
      td.appendChild(input);
    } else {
      td.textContent = value || "";
    }
    return td;
  }

  function createRemoveCell() {
    const td = document.createElement("td");
    const btn = document.createElement("button");
    btn.className = "btn btn--ghost";
    btn.textContent = "Șterge";
    btn.addEventListener("click", function () {
      const row = btn.closest("tr");
      row?.remove();
    });
    td.appendChild(btn);
    return td;
  }

  function addRow(table, columns) {
    const tbody = table.querySelector("tbody");
    const tr = document.createElement("tr");
    columns.forEach((col) => tr.appendChild(createCell(col)));
    tr.appendChild(createRemoveCell());
    tbody.appendChild(tr);
    tr.querySelector("input")?.focus();
  }

  function wireButtons() {
    document.querySelector('[data-action="add-mix"]').addEventListener("click", function () {
      addRow(mixTable, ["Specia", "Cod", "P", "R", "DM"]);
    });

    document.querySelector('[data-action="add-comp"]').addEventListener("click", function () {
      addRow(compTable, ["Specia", "Cod", "P", "DM", "HM", "VOLU"]);
    });

    document.querySelector('[data-action="reset"]').addEventListener("click", function () {
      const tbody = compTable.querySelector("tbody");
      // Keep header rows, clear body
      tbody.innerHTML = "";
    });
  }

  document.addEventListener("DOMContentLoaded", wireButtons);
})();