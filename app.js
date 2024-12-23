const canvasContainer = document.querySelector(".canvas-container");
const colorInput = document.getElementById('colorValue');
const box_colors = document.getElementById('box-colors');

// lay tu api
const anhNha = ["tuong_trai", "line_xanh_trai", "tuong_bep", "tuong_tran"];
const colors = ["#784b43", "#be9480", "#7c4159", "#ad4145", "#e0a5c7", "#c86f9d"];

colors.forEach((color) => {
    const colorBox = document.createElement("div");

    colorBox.className = "color-box";
    colorBox.style.backgroundColor = color;
    colorBox.setAttribute("data-color", color);

    box_colors.appendChild(colorBox);
});


anhNha.forEach((name, index) => {
    const houseDiv = document.createElement("div");
    houseDiv.classList.add("canvas-nha");

    const canvas = document.createElement("canvas");
    canvas.id = `canvas-color${index}`;
    canvas.classList.add("draw-canvas");
    canvas.style.width = "auto";
    canvas.style.height = "auto";
    canvas.style.position = "absolute";

    const img = document.createElement("img");
    img.src = `/change-house-color-wall/sonnha1/${name}.png`;
    img.id = `wall-image${index}`;
    img.classList.add("wall-image");

    houseDiv.appendChild(canvas);
    houseDiv.appendChild(img);

    canvasContainer.appendChild(houseDiv);

    houseDiv.addEventListener("click", function () {
        applyColorToCanvas(canvas, img, colorInput.value);
    });
});

//======> move element
let triggerActive = false;
let activeElement = null;
let offsetX = 0;
let offsetY = 0;

const buttonEdit = document.getElementById("editImage");
buttonEdit.addEventListener('click', () => {
    triggerActive = !triggerActive;
    buttonEdit.innerText = triggerActive ? "Đang bật" : "Đang tắt";
    document.getElementById("context-edit").innerText = triggerActive ? "Đang bật chỉnh sửa" : "Đang tắt chỉnh sửa";
    if (triggerActive == false && activeElement) {
        activeElement.style.cursor = 'default';
    }
});

canvasContainer.addEventListener('mousedown', canvasMouseDown);
canvasContainer.addEventListener('mousemove', canvasMouseMove);
canvasContainer.addEventListener('mouseup', canvasMouseUp);


function canvasMouseDown(e) {
    if (triggerActive == false) {
        return;
    }
    if (e.target.closest('.canvas-nha')) {
        activeElement = e.target.closest('.canvas-nha');

        const rect = activeElement.getBoundingClientRect();
        offsetX = rect.width / 2;
        offsetY = rect.height / 2;
        activeElement.style.cursor = 'grabbing';
    }
}
function canvasMouseMove(e) {
    if (activeElement) {
        const newX = e.clientX - 200 - offsetX;
        const newY = e.clientY - 200 - offsetY;

        activeElement.style.left = `${newX}px`;
        activeElement.style.top = `${newY}px`;
    }
}
function canvasMouseUp() {
    if (activeElement) {
        activeElement.style.cursor = 'grab';
        activeElement = null;
    }
};

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

const colorBoxes = document.querySelectorAll('.color-box');
colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const color = box.getAttribute('data-color');
        colorInput.value = color;
    });
});

