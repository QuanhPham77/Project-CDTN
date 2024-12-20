function handleTable(e) {
  const newTable = document.createElement("div");
  newTable.className = "element";

  // Tạo bảng mặc định với 2 dòng và 2 cột
  newTable.innerHTML = `
        <div id="tableContainer">
            <table id="dynamicTable">
                <tr style="background: #ccc;">
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

    // updateCode();
    scrollToBottom();
  });

  newTable.querySelector(".addColumn").addEventListener("click", () => {
    const table = newTable.querySelector("table");

    for (let i = 0; i < table.rows.length; i++) {
      const newCell = table.rows[i].insertCell();
      newCell.innerHTML = '<input type="text">';
    }

    // updateCode();
    scrollToBottom();
  });
}

function scrollToBottom() {
  container.scrollTop = container.scrollHeight;
}
