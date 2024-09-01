const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let newElement;
let valueInput;
let colorValue;
let contentShow = "";
const elements = $$(".tagname-item");
//handle drag / drop
function handleDragDrop() {
  const container = $(".wrap-list");

  elements.forEach((element) => {
    element.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData(
        "text/plain",
        e.target.dataset.type + "," + e.target.innerHTML
      );

      e.dataTransfer.effectAllowed = "move";
    });
  });

  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  container.addEventListener("drop", (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text/plain"); // Lấy loại thẻ và nội dung
    let [type, text] = data.split(",");
    newElement = document.createElement(type); // Tạo phần tử mới dựa trên loại thẻ
    newElement.innerHTML = text; // Gán nội dung cho phần tử mới
    newElement.className = "wrap__row-text";

    let contentRow = `<div class="wrap__row">
            ${newElement.outerHTML}
            <input type="text" class="wrap__row-content" placeholder="Nhập nội dung..." oninput="getValue()"/>
            <input type="color" class="wrap__row-color" onChange="pickColor()"/>
            <div class="wrap__row-delete" onclick="deleteRow()">X</div>
          </div>`;
    container.insertAdjacentHTML("beforeend", contentRow);
  });
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

// xoa tat ca noi dung
function clearAll() {
  const container = $(".wrap-list");
  if (confirm("Bạn có chắc chắn muốn xóa tất cả?") == true) {
    container.innerHTML = "";
    alert("Tất cả nội dung đã được xóa!");
  } else {
    alert("May quá còn nguyên!");
  }
}

// lay gia tri trong o input
function getValue() {
  const input = $(".wrap__row-content");
  valueInput = input.value;

  return valueInput;
}

function pickColor() {
  const color = $(".wrap__row-color");
  colorValue = color.value;

  return colorValue;
}

function btnRun() {
  const container = $(".wrap-list");
  const show = $(".show-program");
  contentShow += `<${newElement.tagName.toLowerCase()} style="color: ${colorValue}">${valueInput}</${newElement.tagName.toLowerCase()}>`;
  console.log(contentShow);
  show.innerHTML = contentShow;
}

// Delete row
function deleteRow() {
  const row = $(".wrap__row");
  row.remove();
}

// RUN
function run() {
  handleDragDrop();
  handleTags();
}

run();
