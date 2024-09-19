// const element = $(".tagname-item.tagname-item-img");

// function handleImage() {
//   element.addEventListener("dragstart", (e) => {
//     e.dataTransfer.setData("text", e.target.src);
//   });

//   container.addEventListener("dragover", (e) => {
//     e.preventDefault();
//   });

//   container.addEventListener("drop", (e) => {
//     e.preventDefault();
//     const srcImage = e.dataTransfer.getData("text");

//     const rowImg = `
//                 <div class="image-upload-container">
//                     <input type="button" class="fileNameBtn" value="Choose File">
//                     <label>Width: <input type="number" class="imgWidth" value="100"></label>
//                     <label>Height: <input type="number" class="imgHeight" value="100"></label>
//                     <input type="file" accept="image/*" class="imageInput" style="display:none;">

//                 </div>
//             `;
//     container.insertAdjacentHTML("beforeend", rowImg);

//     // Sự kiện khi người dùng chọn file ảnh
//     const imageInput = container.querySelector(".imageInput");
//     const fileNameBtn = container.querySelector(".fileNameBtn");
//     // const imagePreview = container.querySelector('.imagePreview');

//     // Khi nhấn vào nút để chọn file ảnh
//     fileNameBtn.addEventListener("click", function () {
//       imageInput.click();
//     });

//     // Khi người dùng chọn file ảnh
//     imageInput.addEventListener("change", function () {
//       const file = this.files[0];
//       if (file) {
//         fileNameBtn.value = file.name; // Hiển thị tên file thay vì "Choose File"
//         // const fileURL = URL.createObjectURL(file);
//         // imagePreview.src = fileURL;
//         updateCode();
//       }
//     });

//     // Cập nhật khi thay đổi kích thước ảnh
//     const widthInput = container.querySelector(".imgWidth");
//     const heightInput = container.querySelector(".imgHeight");
//     [widthInput, heightInput].forEach((input) => {
//       input.addEventListener("input", function () {
//         updateCode();
//       });
//     });

//     updateCode();
//   });
// }

// handleImage();
