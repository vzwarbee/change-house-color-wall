const input = document.getElementById('upload');
const box_colors = document.getElementById('box-colors');
const colorInput = document.getElementById('colorValue');

const preview = document.createElement('img');
input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        const uploadContainer = document.querySelector(".upload-container")
        const base64Image = reader.result;

        sessionStorage.setItem('uploadedImage', base64Image);
        preview.className = 'preview-image';
        preview.src = base64Image;
        preview.style.width = "160px";
        preview.style.height = "100px";

        const divPreview = document.createElement("div");
        divPreview.className = "preview-block";

        const deleteButton = document.createElement('button');
        deleteButton.className = "delete-botton";
        deleteButton.textContent = 'X';
        deleteButton.onclick = () => {
            sessionStorage.removeItem("uploadedImage");
            divPreview.remove();
        };

        divPreview.appendChild(preview);
        divPreview.appendChild(deleteButton);

        uploadContainer.appendChild(divPreview);
    };

    if (file) {
        reader.readAsDataURL(file);
    }
})

const savedImage = sessionStorage.getItem('uploadedImage');
if (savedImage) {
    preview.src = savedImage;
}

let listData = {};
async function fetchData() {
    try {
        const response = await fetch('mode_data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        listData = await response.json();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


fetchData().then(() => {
    listData?.colors.forEach((color) => {
        const colorBox = document.createElement("div");
        const boxView = document.querySelector(".box-view_selected");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = color;
        colorBox.setAttribute("data-color", color);
        colorBox.addEventListener('click', () => {
            const color = colorBox.getAttribute('data-color');
            colorInput.value = color;
            colorInput.style.borderColor = color;
            boxView.style.backgroundColor = color
        });

        box_colors.appendChild(colorBox);
    });
})

//=====

const input_list = document.getElementById('upload-list');
const gallery = document.getElementById('gallery');
const canvas_container = document.querySelector(".canvas-container");

// Hàm lưu danh sách ảnh vào sessionStorage
function saveImagesToSession(images) {
    sessionStorage.setItem('listImages', JSON.stringify(images));
}

// Hàm lấy danh sách ảnh từ sessionStorage
function getImagesFromSession() {
    const savedImages = sessionStorage.getItem('listImages');
    return savedImages ? JSON.parse(savedImages) : [];
}

// Hàm hiển thị gallery
function renderGallery() {
    gallery.innerHTML = ''; // Xóa nội dung cũ
    const images = getImagesFromSession();

    const fragment = document.createDocumentFragment();
    images.forEach((image, index) => {
        const houseDiv = document.createElement("div");
        houseDiv.classList.add("canvas-nha");

        //----->>>> canvas
        const canvas = document.createElement("canvas");
        canvas.id = `canvas-color${index}`;
        canvas.classList.add("draw-canvas");
        canvas.style.width = "auto";
        canvas.style.height = "auto";
        canvas.style.position = "absolute";

        const imgCanvas = document.createElement("img");
        imgCanvas.src = image;
        imgCanvas.id = `wall-image${index}`;
        imgCanvas.classList.add("wall-image");

        //------->>> img view
        const divListImage = document.createElement('div');
        divListImage.style.display = 'inline-block';
        divListImage.style.position = 'relative';

        const imgView = document.createElement('img');
        imgView.className = "list-image_view";
        imgView.src = image;

        const deleteButton = document.createElement('button');
        deleteButton.className = "delete-button"
        deleteButton.textContent = 'X';
        deleteButton.onclick = () => {
            deleteImage(index);
        };
        divListImage.appendChild(imgView);
        divListImage.appendChild(deleteButton);
        gallery.appendChild(divListImage);

        houseDiv.appendChild(canvas);
        houseDiv.appendChild(imgCanvas);
        houseDiv.addEventListener("click", function () {

            applyColorToCanvas(canvas, imgCanvas, colorInput.value); // Gọi method với các phần tử cần thiết
        });
        fragment.appendChild(houseDiv);
    });
    canvas_container.appendChild(fragment);
}

// Hàm xóa ảnh theo chỉ số
function deleteImage(index) {
    const images = getImagesFromSession();
    images.splice(index, 1);
    saveImagesToSession(images);
    renderGallery();
}


input_list.addEventListener('change', (event) => {
    const files = Array.from(event.target.files); // Lấy danh sách file
    const images = getImagesFromSession(); // Lấy danh sách ảnh hiện tại

    files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
            images.push(reader.result); // Thêm ảnh mới vào danh sách
            saveImagesToSession(images); // Lưu danh sách vào sessionStorage
            renderGallery(); // Cập nhật giao diện
        };

        reader.readAsDataURL(file); // Đọc file dưới dạng Base64
    });
});

function applyColorToCanvas(canvas, img, hexColor) {
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;

    const rgb = hexToRgb(hexColor);

    for (let i = 0; i < data.length; i += 4) {
        data[i] = rgb.r;     // Red
        data[i + 1] = rgb.g; // Green
        data[i + 2] = rgb.b; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
};

function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;
    if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }
    return { r, g, b };
}

renderGallery();