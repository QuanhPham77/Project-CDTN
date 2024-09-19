const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const elements = $$(".tagname-item.format");
const container = $(".wrap-list");
let tag,
  text = "";
let currentId = 0;

// Handle Format
function handleFormat() {
  // dragstart
  elements.forEach((element) => {
    element.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData(
        "text",
        e.target.dataset.type + "," + e.target.innerHTML
      );
    });
  });

  // dragover
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  // drop
  container.addEventListener("drop", (e) => {
    e.preventDefault();

    // hien thanh input khi hoan tat drop
    const data = e.dataTransfer.getData("text");
    [tag, text] = data.split(",");

    const contentRow = `<div class="wrap__row" data-id="${currentId}">
            <${tag} class="wrap__row-text">${text}</${tag}>
            <input type="text" class="wrap__row-content" data-id="${currentId}" placeholder="Nhập nội dung..."/>
            <input type="color" class="wrap__row-color" data-id="${currentId}" />
            <div class="wrap__row-delete" data-id="${currentId}" onclick="deleteRow(this)">X</div>
          </div>`;

    container.insertAdjacentHTML("beforeend", contentRow);

    // Lưu noi dung cua row vao local
    let rows = $$(".wrap__row");
    let rowInfo = {
      id: currentId++,
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
      inputText.addEventListener("change", () => {
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
      inputColor.addEventListener("change", () => {
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
  });
}

// // Delete row
function deleteRow(element) {
  const rowId = element.parentNode.dataset.id;
  const arrRowInfo = JSON.parse(localStorage.getItem("arrRowInfo")) || [];
  for (let i = 0; i < arrRowInfo.length; i++) {
    if (arrRowInfo[i].id == rowId) {
      arrRowInfo.splice(i, 1);
      localStorage.setItem("arrRowInfo", JSON.stringify(arrRowInfo));
    }
  }
  element.parentNode.remove();
}

function clearAll() {
  if (confirm("Bạn muốn xóa tất cả nội dung?")) {
    container.innerHTML = "";
    localStorage.removeItem("arrRowInfo");
    alert("Tat ca noi dung da xoa!");
  } else {
    alert("Thao tac da bi huy bo!");
  }
}

// Handle tags
function handleTags() {
  const tabs = $$(".navbar__item");
  const panes = $$(".tab-pane");

  const tabActive = $(".navbar__item.active");
  const line = $(".navbar__list .line");

  line.style.left = tabActive.offsetLeft + "px";
  line.style.width = tabActive.offsetWidth + "px";

  tabs.forEach((tab, index) => {
    const pane = panes[index];

    tab.onclick = function () {
      $(".navbar__item.active").classList.remove("active");
      $(".tab-pane.active").classList.remove("active");

      line.style.left = this.offsetLeft + "px";
      line.style.width = this.offsetWidth + "px";

      this.classList.add("active");
      pane.classList.add("active");
    };
  });
}

// handle showprogram
function btnRun() {
  // render program
  const showProgram = $(".show-program");
  const rows = JSON.parse(localStorage.getItem("arrRowInfo"));
  let arrRowShow = "";
  console.log(rows);
  rows.forEach((row) => {
    const rowShow = `<${row.tag} style="color: ${row.color}">${row.content}</${row.tag}> <br/>`;
    arrRowShow += rowShow;
  });

  showProgram.innerHTML = arrRowShow;

  // render code
  const code = $(".render__code");
  let codeShow = "";

  rows.forEach((row) => {
    codeShow += `<${row.tag} style="color:${row.color}">${row.content}</${row.tag}>`;
  });
  code.textContent = codeShow;
  Prism.highlightElement(code);
}

// RUN
function renders() {
  if (elements) {
    handleFormat();
  }
  handleTags();
}

renders();

//xoa DL trong local khi load lai trang
window.onload = function () {
  localStorage.clear();
  currentId = 0;
};
