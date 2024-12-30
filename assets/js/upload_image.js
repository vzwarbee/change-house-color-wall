const box_colors = document.getElementById('box-colors');
const colorInput = document.getElementById('colorValue');
const canvas_container = document.querySelector(".canvas-container");



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
        const boxView = document.querySelector(".box-view_selected")
        const colorBox = document.createElement("div");
        colorBox.className = "color-box";
        colorBox.style.backgroundColor = color;
        colorBox.setAttribute("data-color", color);
        colorBox.addEventListener('click', () => {
            const color = colorBox.getAttribute('data-color');
            colorInput.value = color;
            boxView.style.backgroundColor = color;
            colorInput.style.borderColor = color;
        });

        box_colors.appendChild(colorBox);
    });
})

//data image
const sonnha = {
    sonnha1: [
        {
            url: "/change-house-color-wall/assets/images/sonnha1/sonnha.png",
            top: 0,
            left: 0
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha1/tuong_tran.png",
            top: 0,
            left: 0
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha1/tuong_trai.png",
            top: '40px',
            left: 0
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha1/tuong_bep.png",
            left: '226px',
            top: ' 94.75px'
        }
    ],
    sonnha2: [
        {
            url: "/change-house-color-wall/assets/images/sonnha2/sonnha.png",
            top: 0,
            left: 0
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha2/sonnha1.png",
            top: 0,
            left: '395px'
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha2/sonnha2.png",
            top: '0',
            left: 0
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha2/sonnha3.png",
            top: '0',
            left: '0'
        }
    ],
    sonnha3: [
        {
            url: "/change-house-color-wall/assets/images/sonnha3/sonnha.png",
            top: 0,
            left: 0
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha3/sonnha1.png",
            top: '91px',
            left: '0'
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha3/sonnha2.png",
            top: '0',
            left: '0'
        },
    ],
    sonnha4: [
        {
            url: "/change-house-color-wall/assets/images/sonnha4/sonnha.png",
            top: 0,
            left: 0
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha4/sonnha1.png",
            top: '0',
            left: '212px'
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha4/sonnha2.png",
            top: '0',
            left: '0'
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha4/sonnha3.png",
            top: '0',
            left: '0'
        },
    ],
    sonnha5: [
        {
            url: "/change-house-color-wall/assets/images/sonnha5/sonnha.png",
            top: 0,
            left: 0
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha5/sonnha1.png",
            top: '25px',
            left: '142px'
        },
        {
            url: "/change-house-color-wall/assets/images/sonnha5/sonnha2.png",
            top: '69px',
            left: '171px'

        },
        {
            url: "/change-house-color-wall/assets/images/sonnha5/sonnha3.png",
            top: '122px',
            left: '190px'
        },
    ],
};

// slide change image
const navbarActive = document.querySelectorAll(".nav-bar .list-navbar .item-navbar");
const listFeature = document.querySelectorAll(".item-feature");
listFeature.forEach((itemFeature, index) => {
    itemFeature.addEventListener("click", () => {
        navbarActive.forEach(navItem => {
            navItem.classList.remove("active");
        });

        navbarActive[index].classList.add("active");
        const groupName = itemFeature.getAttribute("data-group");

        if (sonnha[groupName]) {
            innerContentContainer(sonnha[groupName]);
        } else {
            alert("Có gì đó đang lỗi, chúng tôi đang sửa chửa. Mong bạn thông cảm!");
        }
    });
});

function innerContentContainer(grouphouse) {
    canvasContainer.innerHTML = "";
    let data = Array.isArray(grouphouse) ? grouphouse : Object.values(grouphouse);

    if (!data || data.length === 0) {
        console.error("Dữ liệu không hợp lệ hoặc rỗng.");
        return;
    }

    canvasContainer.style.backgroundImage = `url(${data[0]?.url || ""})`;
    const result = data.slice(1);

    result.forEach((item, index) => {
        const houseDiv = document.createElement("div");
        houseDiv.classList.add("canvas-nha");
        houseDiv.style.top = item.top;
        houseDiv.style.left = item.left;

        const canvas = document.createElement("canvas");
        canvas.id = `canvas-color${index}`;
        canvas.classList.add("draw-canvas");
        canvas.style.width = "auto";
        canvas.style.height = "auto";
        canvas.style.position = "absolute";

        const imgCanvas = document.createElement("img");
        imgCanvas.src = item.url;
        imgCanvas.id = `wall-image${index}`;
        imgCanvas.classList.add("wall-image");

        houseDiv.appendChild(canvas);
        houseDiv.appendChild(imgCanvas);
        houseDiv.addEventListener("click", function () {

            applyColorToCanvas(canvas, imgCanvas, colorInput.value)
        });
        canvas_container.appendChild(houseDiv);
    })

}

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

const parentCanvas = document.querySelectorAll(".canvas-nha");
parentCanvas.forEach((itemDiv, index) => {
    const listImage = sessionStorage.getItem('listImages');
    if (listImage == null | listImage == []) {
        itemDiv.addEventListener("click", () => {
            const canvas = document.getElementById(`canvas-color${index}`);
            const img = document.getElementById(`wall-image${index}`);

            if (canvas && img) {
                applyColorToCanvas(canvas, img, colorInput.value);
            } else {
                console.error("Canvas hoặc Img không tồn tại với index:", index);
            }
        });
    }
});

function checkStorage() {
    const listImage = sessionStorage.getItem('listImages');
    if (listImage) {
        renderGallery()
    }
}

checkStorage();