const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let rowInfo = {};

// drag / drop
function handleDragDrop() {
  const elements = $$(".tagname-item");
  const container = $(".wrap-list");

  // dragstart
  elements.forEach((element) => {
    element.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData(
        "text/plain",
        e.target.dataset.type + "," + e.target.innerHTML
      );
      e.dataTransfer.effectAllowed = "move";
    });
  });

  // dragover
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  // Drop
  container.addEventListener("drop", (e) => {
    e.preventDefault();

    const data = e.dataTransfer.getData("text");
    [tag, text] = data.split(",");

    let contentRow = `<div class="wrap__row" data-index="">
            <${tag} class="wrap__row-text">${text}</${tag}>
            <input type="text" class="wrap__row-content" placeholder="Nhập nội dung..."/>
            <input type="color" class="wrap__row-color" />
            <div class="wrap__row-delete" onclick="deleteRow(this)">X</div>
          </div>`;

    container.insertAdjacentHTML("beforeend", contentRow);

    // Lưu dữ liệu
    let rows = $$(".wrap__row");

    let currentId = 0;
    rows.forEach((row) => {
      let inputText = row.querySelector(".wrap__row-content");
      let inputColor = row.querySelector(".wrap__row-color");
      rowInfo = {
        id: currentId++,
        tag: tag,
        text: text.trim(),
        content: "",
        color: "",
      };

      inputText.addEventListener("change", () => {
        rowInfo.content = inputText.value;
        if (rowInfo.content && rowInfo.color) {
          storeRowInfo(rowInfo);
        }
      });
      inputColor.addEventListener("change", () => {
        rowInfo.color = inputColor.value;
        if (rowInfo.content && rowInfo.color) {
          storeRowInfo(rowInfo);
        }
      });

      function storeRowInfo(rowInfo) {
        rowInfo.content = inputText.value;
        rowInfo.color = inputColor.value;
        let data = JSON.parse(localStorage.getItem("rowInfos")) || [];
        data.push(rowInfo);
        localStorage.setItem("rowInfos", JSON.stringify(data));
      }
    });
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
    localStorage.removeItem("rowInfos");
    alert("Tất cả nội dung đã được xóa!");
  } else {
    alert("May quá còn nguyên!");
  }
}

// Delete row
function deleteRow(element) {
  let rows = $$(".wrap__row");
  const data = JSON.parse(localStorage.getItem("rowInfos")) || [];
  for (let i = 0; i < rows.length; i++) {
    if (data[i].id === rowInfo.id) {
      data.splice(i - 1, 1);
      localStorage.setItem("rowInfos", JSON.stringify(data));
    }
  }
  element.parentNode.remove();
}

// Handle btn RUN
function btnRun() {
  const showProgram = $(".show-program");
  const data = JSON.parse(localStorage.getItem("rowInfos")) || [];
  data.forEach((row) => {
    const rowShow = `<${row.tag} style="color: ${row.color}">${row.content}</${row.tag}> <br/>`;
    showProgram.innerHTML += rowShow;
  });
}

// RUN
function renders() {
  handleDragDrop();
  handleTags();
}

renders();

//xoa DL trong local khi load lai trang
window.onload = function () {
  localStorage.clear();
};
