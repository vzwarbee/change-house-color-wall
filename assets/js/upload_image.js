const box_colors = document.getElementById("box-colors");
const canvas_container = document.querySelector(".canvas-container");
const labelColor = document.getElementById("labelColor");
let fillCanvasColor = "rgb(245,238,206)";
let listData = {};
async function fetchData() {
  try {
    const response = await fetch("mode_data.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    listData = await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}
const boxView = document.querySelector(".box-view_selected");
const boxColors = document.querySelector("#box-colors");
const searchColorInput = document.querySelector("#searchColor");

fetchData().then(() => {
  if (!listData || !listData.colors) {
    console.error("Dữ liệu không hợp lệ hoặc bị thiếu!");
    return;
  }

  renderColors(listData.colors);

  searchColorInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const filteredColors = listData.colors.filter((color) =>
      color.name.toLowerCase().includes(query)
    );
    renderColors(filteredColors);
  });
});

function renderColors(colors) {
  boxColors.innerHTML = "";
  colors.forEach(({ name, color }) => {
    const colorBox = createColorBox(name, color);
    boxColors.appendChild(colorBox);
  });
}

function createColorBox(name, color) {
  const colorBox = document.createElement("div");
  const tooltip = document.createElement("div");
  const tooltipText = document.createElement("p");

  colorBox.className = "color-box";
  colorBox.style.backgroundColor = `rgb(${color})`;
  colorBox.setAttribute("data-color", `rgb(${color})`);
  colorBox.setAttribute("data-name", name);
  colorBox.id = `${name}`;
  tooltip.className = "tooltipColor";
  tooltip.style.backgroundColor = `rgb(${color})`;
  tooltipText.innerText = `${name}`;

  colorBox.addEventListener("mousemove", (event) => {
    boxMouseMove(event, tooltip, colorBox);
  });
  colorBox.addEventListener("mouseleave", () => {
    boxMouseLeave(tooltip);
  });

  tooltip.appendChild(tooltipText);
  colorBox.appendChild(tooltip);

  colorBox.addEventListener("click", (event) =>
    handleColorBoxClick(event, name, color)
  );

  return colorBox;
}

function handleColorBoxClick(event, name, color) {
  const colorBox = event.currentTarget;
  const artColor = `rgb(${color})`;
  const titleLabelColor = `${name}`;

  searchColorInput.style.borderColor = artColor;
  fillCanvasColor = artColor;
  boxView.style.backgroundColor = artColor;
  updateBoxViewContent(titleLabelColor, ".box-view_selected::after");
  updateBoxViewContent(
    titleLabelColor,
    ".color-box.active::after",
    `rgb(${color})`
  );
  linkToColor(titleLabelColor);
  document
    .querySelectorAll(".color-box")
    .forEach((box) => box.classList.remove("active"));
  colorBox.classList.add("active");
}

function linkToColor(hash) {
  boxView.addEventListener("click", () => {
    location.hash = hash;
  });
}

//data image
const sonnha = {
  sonnha1: [
    {
      url: "/change-house-color-wall/assets/images/sonnha1/sonnha.png",
      top: 0,
      left: 0,
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha1/tuong_tran.png",
      top: 0,
      left: 0,
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha1/tuong_trai.png",
      top: "40px",
      left: 0,
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha1/tuong_bep.png",
      left: "226px",
      top: " 94.75px",
    },
  ],
  sonnha2: [
    {
      url: "/change-house-color-wall/assets/images/sonnha2/sonnha.png",
      top: 0,
      left: 0,
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha2/sonnha1.png",
      top: 0,
      left: "395px",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha2/sonnha2.png",
      top: "0",
      left: 0,
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha2/sonnha3.png",
      top: "0",
      left: "0",
    },
  ],
  sonnha3: [
    {
      url: "/change-house-color-wall/assets/images/sonnha3/sonnha.png",
      top: 0,
      left: 0,
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha3/sonnha1.png",
      top: "91px",
      left: "0",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha3/sonnha2.png",
      top: "0",
      left: "0",
    },
  ],
  sonnha4: [
    {
      url: "/change-house-color-wall/assets/images/sonnha4/sonnha.png",
      top: 0,
      left: 0,
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha4/sonnha1.png",
      top: "0",
      left: "212px",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha4/sonnha2.png",
      top: "0",
      left: "0",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha4/sonnha3.png",
      top: "0",
      left: "0",
    },
  ],
  sonnha5: [
    {
      url: "/change-house-color-wall/assets/images/sonnha5/sonnha.png",
      top: 0,
      left: 0,
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha5/sonnha1.png",
      top: "25px",
      left: "142px",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha5/sonnha2.png",
      top: "69px",
      left: "171px",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha5/sonnha3.png",
      top: "122px",
      left: "190px",
    },
  ],
  sonnha6: [
    {
      url: "/change-house-color-wall/assets/images/sonnha6/1/sonnha.webp",
      y: 0,
      x: 0,
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha6/1/sonnha1.webp",
      y: "0",
      x: "0",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha6/1/sonnha2.webp",
      x: "0",
      y: "132px",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha6/1/sonnha3.webp",
      x: "0",
      y: "126px",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha6/1/sonnha4.webp",
      x: "0",
      y: "294px",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha6/1/sonnha5.webp",
      x: "0",
      y: "17px",
    },
  ],
  sonnha7: [
    {
      url: "/change-house-color-wall/assets/images/sonnha7/1/sonnha.webp",
      y: 0,
      x: 0,
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha7/1/sonnha1.webp",
      y: "0",
      x: "0",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha7/1/sonnha2.webp",
      x: "207px",
      y: "180px",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha7/1/sonnha3.webp",
      x: "405px",
      y: "171px",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha7/1/sonnha5.webp",
      x: "0",
      y: "0",
    },
    {
      url: "/change-house-color-wall/assets/images/sonnha7/1/sonnha4.webp",
      x: "0",
      y: "171px",
    },
  ],
};

// slide change image
const navbarActive = document.querySelectorAll(
  ".nav-bar .list-navbar .item-navbar"
);
const listFeature = document.querySelectorAll(".item-feature");
listFeature.forEach((itemFeature, index) => {
  itemFeature.addEventListener("click", () => {
    navbarActive.forEach((navItem) => {
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

navbarActive.forEach((navItem, index) => {
  navItem.addEventListener("click", () => {
    navbarActive.forEach((nav) => nav.classList.remove("active"));

    navItem.classList.add("active");

    const relatedFeature = listFeature[index];
    if (relatedFeature) {
      const groupName = relatedFeature.getAttribute("data-group");

      if (sonnha[groupName]) {
        innerContentContainer(sonnha[groupName]);
      } else {
        alert(
          "Có gì đó đang lỗi, chúng tôi đang sửa chữa. Mong bạn thông cảm!"
        );
      }
    }
  });
});

function innerContentContainer(grouphouse) {
  canvas_container.innerHTML = "";
  let data = Array.isArray(grouphouse) ? grouphouse : Object.values(grouphouse);

  if (!data || data.length === 0) {
    console.error("Dữ liệu không hợp lệ hoặc rỗng.");
    return;
  }

  canvas_container.style.backgroundImage = `url(${data[0]?.url || ""})`;
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
      applyColorToCanvas(canvas, imgCanvas, fillCanvasColor);
    });
    canvas_container.appendChild(houseDiv);
  });
}

function applyColorToCanvas(canvas, img, hexColor) {
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;

  ctx.drawImage(img, 0, 0, img.width, img.height);

  const imageData = ctx.getImageData(0, 0, img.width, img.height);
  const data = imageData.data;

  const { r, g, b } = (() => {
    const [r, g, b] = hexColor.match(/\d+/g).map(Number);
    return { r, g, b };
  })();

  for (let i = 0; i < data.length; i += 4) {
    data[i] = r; // Red
    data[i + 1] = g; // Green
    data[i + 2] = b; // Blue
  }

  ctx.putImageData(imageData, 0, 0);
}

function hexToRgb(hex) {
  let r = 0,
    g = 0,
    b = 0;
  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return { r, g, b };
}

const parentCanvas = document.querySelectorAll(".canvas-nha");
parentCanvas.forEach((itemDiv, index) => {
  const listImage = sessionStorage.getItem("listImages");
  if ((listImage == null) | (listImage == [])) {
    itemDiv.addEventListener("click", () => {
      const canvas = document.getElementById(`canvas-color${index}`);
      const img = document.getElementById(`wall-image${index}`);

      if (canvas && img) {
        applyColorToCanvas(canvas, img, fillCanvasColor);
      } else {
        console.error("Canvas hoặc Img không tồn tại với index:", index);
      }
    });
  }
});

function checkStorage() {
  const listImage = sessionStorage.getItem("listImages");
  if (listImage) {
    renderGallery();
  }
}

checkStorage();

function updateBoxViewContent(content, classTo, rgbColor) {
  const style = document.createElement("style");
  style.textContent = `
    ${classTo} {
      content: "${content}";
      ${rgbColor && `color: ${getTextColor(rgbColor)}`};
    }
  `;
  document.head.appendChild(style);
}

function boxMouseMove(event, tooltip) {
  tooltip.style.opacity = "1";
  tooltip.style.visibility = "visible";

  tooltip.style.width = "120px";
  tooltip.style.height = "80px";

  tooltip.style.left = event.clientX - 20 + "px";
  tooltip.style.top = event.clientY - 20 + "px";
}

function boxMouseLeave(tooltip) {
  tooltip.style.opacity = "0";
  tooltip.style.visibility = "hidden";

  tooltip.style.width = "50px";
  tooltip.style.height = "60px";
}

function getTextColor(backgroundColor) {
  const rgb = backgroundColor
    .replace(/[^\d,]/g, "")
    .split(",")
    .map(Number);

  const luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

  return luminance > 128 ? "#000" : "#fff";
}
