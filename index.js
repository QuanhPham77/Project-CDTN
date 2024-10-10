const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const elementsFormat = $$(".tagname-item.format");
const elementImage = $(".tagname-item.tagname-item-img");
const container = $(".wrap-list");
const code = $(".render__code");
const showProgram = $(".show-program");
let type = "";

//event dragstart cho format
elementsFormat.forEach((elementFormat) => {
  elementFormat.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("type", "format");
    e.dataTransfer.setData("tag", e.target.dataset.type);
    e.dataTransfer.setData("text", e.target.innerHTML);
  });
});

// event dragstart cho image
elementImage.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("type", "image");
});

// drag over
container.addEventListener("dragover", (e) => {
  e.preventDefault();
});

// drop
container.addEventListener("drop", (e) => {
  e.preventDefault();

  type = e.dataTransfer.getData("type");

  if (type == "format") {
    handleFormat(e);
  } else if (type == "image") {
    handleImage(e);
  }
});

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
      container.innerHTML = "";
      showProgram.innerHTML = "";
      code.innerHTML = "";
      localStorage.removeItem("arrRowInfo");

      $(".navbar__item.active").classList.remove("active");
      $(".tab-pane.active").classList.remove("active");

      line.style.left = this.offsetLeft + "px";
      line.style.width = this.offsetWidth + "px";

      this.classList.add("active");
      pane.classList.add("active");
    };
  });
}
handleTags();

// handle showprogram
function btnRun() {
  // render program
  const rows = JSON.parse(localStorage.getItem("arrRowInfo"));
  let arrRowShow = "";

  if (type == "format") {
    rows.forEach((row) => {
      const rowShow = `<${row.tag} style="color: ${row.color}">${row.content}</${row.tag}> <br>`;
      arrRowShow += rowShow;
    });

    showProgram.innerHTML = arrRowShow;

    // render code
    let codeShow = "";
    rows.forEach((row) => {
      codeShow += `<${row.tag} style="color:${row.color}">${row.content}</${row.tag}>\n`;
    });
    code.textContent = codeShow;
    Prism.highlightElement(code);
  } else if (type == "image") {
    let rowsImgs = JSON.parse(localStorage.getItem("arrRowImgs"));

    rowsImgs.forEach((row) => {
      const rowShow = `<img src="${row.urlImage}" alt="image" style="width: ${row.width}px; height: ${row.height}px;">\t`;
      arrRowShow += rowShow;
    });

    showProgram.innerHTML = arrRowShow;

    // render code
    let codeShow = "";
    rowsImgs.forEach((row) => {
      codeShow += `<img src="${row.urlImage}" alt="image" style="width: ${row.width}px; height: ${row.height}px;">\n`;
    });
    code.textContent = codeShow;
    Prism.highlightElement(code);
  }
}

// // Delete row
function deleteRow(element) {
  const rowId = element.parentNode.dataset.id;
  const arrRowInfo = JSON.parse(localStorage.getItem("arrRowInfo")) || [];
  const rowsImgs = JSON.parse(localStorage.getItem("arrRowImgs"));

  // format
  for (let i = 0; i < arrRowInfo.length; i++) {
    if (arrRowInfo[i].id == rowId) {
      arrRowInfo.splice(i, 1);
      localStorage.setItem("arrRowInfo", JSON.stringify(arrRowInfo));
    }
  }

  // image
  for (let i = 0; i < rowsImgs.length; i++) {
    if (rowsImgs[i].id == rowId) {
      rowsImgs.splice(i, 1);
      localStorage.setItem("arrRowImgs", JSON.stringify(rowsImgs));
    }
  }
  element.parentNode.remove();
}

// Delete All
function clearAll() {
  if (confirm("Bạn muốn xóa tất cả nội dung?")) {
    container.innerHTML = "";
    showProgram.innerHTML = "";
    code.innerHTML = "";
    localStorage.clear();
    alert("Tất cả nội dung đã được xóa!");
  } else {
    alert("Thao tác đã bị hủy bỏ!");
  }
}

//xoa DL trong local khi load lai trang
window.onload = function () {
  localStorage.clear();
  currentId = 0;
};
