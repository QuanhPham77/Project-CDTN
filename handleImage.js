let countImg = 0;

function handleImage(e) {
  // đặt nội dung của hàngg sau khi thực hiện drop
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
  container.insertAdjacentHTML("beforeend", contentRow); // render hàng sau khi drop

  let rows = $$(".wrap__row"); // lấy ra tất cả các thẻ có class là wrap__row
  let rowImg = {
    id: countImg++,
    width: 100,
    height: 100,
    urlImage: "",
  }; // đặt dữ liệu của từng hàng để lưu vào local

  let arrRowImgs = JSON.parse(localStorage.getItem("arrRowImgs")) || []; // lấy dữ liệu từ local
  arrRowImgs.push(rowImg); // thêm dữ liệu của hàng mới rowImg vào cuối mảng arrRowImgs
  localStorage.setItem("arrRowImgs", JSON.stringify(arrRowImgs)); // sau khi thêm dữ liệu hàng mới thì lưu lại vào local

  // duyệt từng phần tử trong biến rows
  rows.forEach((row) => {
    let inputWidth = row.querySelector(".wrap__row-width"); // lấy ra thẻ có class là wrap__row-width
    let inputHeight = row.querySelector(".wrap__row-height"); // lấy ra thẻ có class là wrap__row-height
    let inputPath = row.querySelector(".wrap__row-file"); // lấy ra thẻ có class là wrap__row-file

    // Lưu dữ liệu từ ô input width vào local
    inputWidth.addEventListener("input", () => {
      // thêm sự kiện oninput
      const widthId = inputWidth.dataset.id; // lấy ra data-id của ô input width
      const widthValue = inputWidth.value; // lấy ra value của ô input width

      // duyệt từng phàn tử trong biến arrRowImgs
      for (let i = 0; i < arrRowImgs.length; i++) {
        if (widthId == arrRowImgs[i].id) {
          // kiểm tra nếu id của ô input có sự kiện oninput bằng với id của phần tử trong mảng arrRowImgs thì set thuộc tính width = giá trị từ ô input width vừa nhập
          arrRowImgs[i].width = widthValue;
          localStorage.setItem("arrRowImgs", JSON.stringify(arrRowImgs)); // lưu lại dữ liệu vào local
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
