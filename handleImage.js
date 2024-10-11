let countImg = 0;
const rows = $$(".wrap__row");

function handleImage(e) {
  const contentRow = `
      <div class="wrap__row" data-id="${countImg}">
        <div class="wrap__row-img-text">&lt;img&gt;</div>
        <div class="wrap__row-mid">
            <input type="file" accept="image/*" class="wrap__row-file" data-id="${countImg}"/>

            <label>Width(px): </label>
            <input type="number" class="wrap__row-input wrap__row-width" data-id="${countImg}"/>

            <label>Height(px): </label>
            <input type="number" class="wrap__row-input wrap__row-height" data-id="${countImg}"/>
        </div>

        <div class="wrap__row-delete" onclick="deleteRow(this)" data-id="${countImg}">X</div>
      </div>`;
  container.insertAdjacentHTML("beforeend", contentRow);

  let rows = $$(".wrap__row");
  let rowImg = {
    id: countImg++,
    width: 100,
    height: 0,
    urlImage: "",
  };

  let arrRowImgs = JSON.parse(localStorage.getItem("arrRowImgs")) || [];
  arrRowImgs.push(rowImg);
  localStorage.setItem("arrRowImgs", JSON.stringify(arrRowImgs));

  rows.forEach((row) => {
    let inputWidth = row.querySelector(".wrap__row-width");
    let inputHeight = row.querySelector(".wrap__row-height");
    let inputPath = row.querySelector(".wrap__row-file");

    // Lưu width vào local
    inputWidth.addEventListener("input", () => {
      const widthId = inputWidth.dataset.id;
      const widthValue = inputWidth.value;

      for (let i = 0; i < arrRowImgs.length; i++) {
        if (widthId == arrRowImgs[i].id) {
          arrRowImgs[i].width = widthValue;
          localStorage.setItem("arrRowImgs", JSON.stringify(arrRowImgs));
        }
      }
    });

    // luu height vao local
    inputHeight.addEventListener("input", () => {
      const heightId = inputHeight.dataset.id;
      const heightValue = inputHeight.value;

      for (let i = 0; i < arrRowImgs.length; i++) {
        if (heightId == arrRowImgs[i].id) {
          arrRowImgs[i].height = heightValue;
          localStorage.setItem("arrRowImgs", JSON.stringify(arrRowImgs));
        }
      }
    });

    // luu path img vao local
    inputPath.addEventListener("change", () => {
      const pathId = inputPath.dataset.id;
      const file = inputPath.files[0];

      if (file) {
        const imgURL = URL.createObjectURL(file);

        for (let i = 0; i < arrRowImgs.length; i++) {
          if (pathId == arrRowImgs[i].id) {
            arrRowImgs[i].urlImage = imgURL;
            localStorage.setItem("arrRowImgs", JSON.stringify(arrRowImgs));
          }
        }
      }
    });
  });
}
