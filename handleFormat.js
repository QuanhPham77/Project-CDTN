let tag = "";
let text = "";
let countFormat = 0;

// Handle Format
function handleFormat(e) {
  // hien thanh input khi hoan tat drop
  tag = e.dataTransfer.getData("tag");
  text = e.dataTransfer.getData("text");

  const contentRow = `<div class="wrap__row" data-id="${countFormat}">
            <${tag} class="wrap__row-text">${text}</${tag}>
            <input type="text" class="wrap__row-content" data-id="${countFormat}" placeholder="Nhập nội dung..."/>
            <input type="color" class="wrap__row-color" data-id="${countFormat}" />
            <div class="wrap__row-delete" data-id="${countFormat}" onclick="deleteRow(this)">X</div>
          </div>`;
  container.insertAdjacentHTML("beforeend", contentRow);

  // Lưu noi dung cua row vao local
  let rows = $$(".wrap__row");
  let rowInfo = {
    id: countFormat++,
    tag: tag,
    content: "",
    color: "#000",
  };

  let arrRowInfo = JSON.parse(localStorage.getItem("arrRowInfo")) || [];
  arrRowInfo.push(rowInfo);
  localStorage.setItem("arrRowInfo", JSON.stringify(arrRowInfo));

  rows.forEach((row) => {
    let inputText = row.querySelector(".wrap__row-content");
    let inputColor = row.querySelector(".wrap__row-color");

    // Lưu text vào local
    inputText.addEventListener("input", () => {
      const textId = inputText.dataset.id;
      const textValue = inputText.value;

      for (let i = 0; i < arrRowInfo.length; i++) {
        if (textId == arrRowInfo[i].id) {
          arrRowInfo[i].content = textValue;
          localStorage.setItem("arrRowInfo", JSON.stringify(arrRowInfo));
        }
      }
    });

    // Lưu color vào local
    inputColor.addEventListener("input", () => {
      const colorId = inputColor.dataset.id;
      const colorValue = inputColor.value;

      for (let i = 0; i < arrRowInfo.length; i++) {
        if (colorId == arrRowInfo[i].id) {
          arrRowInfo[i].color = colorValue;
          localStorage.setItem("arrRowInfo", JSON.stringify(arrRowInfo));
        }
      }
    });
  });
}
