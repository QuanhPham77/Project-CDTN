function handleTable(e) {
  const newTable = document.createElement("div");
  newTable.className = "element";

  // Tạo bảng mặc định với 2 dòng và 2 cột
  newTable.innerHTML = `
        <div id="tableContainer">
            <table id="dynamicTable">
                <tr>
                    <td><input type="text"></td>
                    <td><input type="text"></td>
                </tr>
                <tr>
                    <td><input type="text"></td>
                    <td><input type="text"></td>
                </tr>
            </table>
        </div>
        <button class="addRow">Thêm 1 dòng</button>
        <button class="addColumn">Thêm 1 cột</button>
    `;
  container.appendChild(newTable);

  newTable.querySelector(".addRow").addEventListener("click", () => {
    const table = newTable.querySelector("table");
    const newRow = table.insertRow();
    const cols = table.rows[0].cells.length;

    for (let i = 0; i < cols; i++) {
      const newCell = newRow.insertCell();
      newCell.innerHTML = '<input type="text">';
    }

    updateCode();
    scrollToBottom();
  });

  newTable.querySelector(".addColumn").addEventListener("click", () => {
    const table = newTable.querySelector("table");

    for (let i = 0; i < table.rows.length; i++) {
      const newCell = table.rows[i].insertCell();
      newCell.innerHTML = '<input type="text">';
    }

    updateCode();
    scrollToBottom();
  });
}

function scrollToBottom() {}

function updateCode() {
  const elements = container.querySelectorAll(".element");
  let htmlCode = "";

  elements.forEach((el) => {
    const table = el.querySelector("table");
    let tableCode = `<table border="1" style="table-layout: fixed; width: 100%;">\n`;

    for (let i = 0; i < table.rows.length; i++) {
      tableCode += "  <tr>\n";
      for (let j = 0; j < table.rows[i].cells.length; j++) {
        const cellInput = table.rows[i].cells[j].querySelector("input");
        const cellContent = cellInput ? cellInput.value : "";
        tableCode += `<td>${cellContent}</td>\n`;
      }
      tableCode += "  </tr>\n";
    }
    tableCode += "</table>\n";
    htmlCode += tableCode;
  });

  code.textContent = htmlCode;
}
