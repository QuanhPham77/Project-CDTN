/*
const elements = document.querySelectorAll(".wrap__li");
const container = document.querySelector(".wrap__container");

elements.forEach((element) => {
  element.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.setData("text/html", element.innerHTML);
  });
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
});

container.addEventListener("drop", (e) => {
  e.preventDefault();

  // const tagName = e.dataTransfer.getData("text/plain");
  const content = e.dataTransfer.getData("text/html");

  elements.forEach((element) => {
    let newElement;

    if (newElm.id === "the2") {
      newElement = document.createElement("h1");
    }

    newElement.innerHTML = content;
    container.appendChild(newElement);
  });
  */

// elements.forEach((element, index) => {
//   if (element.id === e.dataTransfer.getData("text")) {
//     const clonedElement = element.cloneNode(true); // Sao chép phần tử được kéo
//     container.appendChild(clonedElement);
//   }
// });
// });

// handle drag / drop
const elements = document.querySelectorAll(".tagname-item");
const container = document.querySelector(".box__move");

elements.forEach((element) => {
  element.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", e.target.className);
    e.dataTransfer.setData("text/html", element.innerHTML);
  });
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
});

container.addEventListener("drop", (e) => {
  e.preventDefault();

  // const tagName = e.dataTransfer.getData("text/plain");
  const data = e.dataTransfer.getData("text/html");
  const className = e.dataTransfer.getData("text/plain");

  elements.forEach((element) => {
    if (element.className === e.dataTransfer.getData("text/plain")) {
      const secondClass = element.classList[1];
      const nameCard = document.createElement(`${secondClass}`);
      nameCard.textContent = `Thẻ ${secondClass}`;

      let card = `<div class="wrap__row">
                      ${nameCard.innerHTML}
                      <input type="text" class="wrap__row-content" />
                      <input type="color" class="wrap__row-color" />
                    </div>`;

      container.innerHTML = card;
      console.log(nameCard);
    }
  });
});

// Handle tags
function handleTags() {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
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

function run() {
  handleTags();
}

run();
