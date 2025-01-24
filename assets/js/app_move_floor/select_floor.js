// Khởi tạo canvas và WebGL context
const canvas = document.getElementById("webglCanvas");
const gl = canvas.getContext("webgl");
let image = null;
let numColumns = 10; // Số cột mặc định
let numRows = 8;

if (!gl) {
  console.error("WebGL không được hỗ trợ.");
}

if (!gl) {
  console.error("WebGL không được hỗ trợ.");
}

function handleImageUpload() {
  const input = document.getElementById("imageInput");
  const file = input.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        image = img;
        renderImage();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function renderImage() {
  if (!image) return;

  gl.clear(gl.COLOR_BUFFER_BIT);

  const imageWidth = image.width / numColumns;
  const imageHeight = image.height / numRows;

  const texture = loadTexture(gl, image);
  drawImage(gl, texture, imageWidth, imageHeight);
}

function loadTexture(gl, image) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return texture;
}

function drawImage(gl, texture, imageWidth, imageHeight) {
  const program = createShaderProgram(gl);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
  const textureLocation = gl.getUniformLocation(program, "u_texture");

  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numColumns; col++) {
      const xOffset = (col / numColumns) * 2 - 1;
      const yOffset = (row / numRows) * 2 - 1;

      const vertices = new Float32Array([
        xOffset,
        yOffset,
        0,
        0,
        xOffset,
        yOffset + 2 / numRows,
        0,
        1,
        xOffset + 2 / numColumns,
        yOffset,
        1,
        0,
        xOffset + 2 / numColumns,
        yOffset + 2 / numRows,
        1,
        1,
      ]);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 4 * 4, 0);
      gl.vertexAttribPointer(
        texCoordLocation,
        2,
        gl.FLOAT,
        false,
        4 * 4,
        2 * 4
      );
      gl.enableVertexAttribArray(positionLocation);
      gl.enableVertexAttribArray(texCoordLocation);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(textureLocation, 0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }
}

function createShaderProgram(gl) {
  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texCoord;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texCoord = a_texCoord;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    varying vec2 v_texCoord;
    uniform sampler2D u_texture;
    void main() {
      gl_FragColor = texture2D(u_texture, v_texCoord);
    }
  `;

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  return program;
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Error compiling shader:", gl.getShaderInfoLog(shader));
  }
  return shader;
}

function updateRender(value) {
  const printValueRow = document.getElementById("valueRow");
  const printValueCol = document.getElementById("valueCol");
  switch (value) {
    case "rowup":
      numRows++;
      printValueRow.innerHTML = numRows;
      break;
    case "rowdown":
      numRows--;
      printValueRow.innerHTML = numRows;
      break;
    case "colup":
      numColumns++;
      printValueCol.innerHTML = numColumns;
      break;
    case "coldown":
      numColumns--;
      printValueCol.innerHTML = numColumns;
      break;
  }
  renderImage();
}

//get data

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
fetchData().then(() => {
  const { flats } = listData;
  const divflat = document.querySelector(".listFlat");

  divflat.innerHTML = "";
  listMenu(listData);
  flats.forEach((flatItem) => {
    const flatDiv = document.createElement("div");
    flatDiv.classList.add("flatItem");
    const imgFlat = document.createElement("img");
    imgFlat.classList.add("flat-img");
    imgFlat.src =
      "/change-house-color-wall/assets/images/mau_gach/" + flatItem.url;
    imgFlat.alt = flatItem.name;
    const tooltip = document.createElement("div");
    tooltip.classList.add("flat-tooltip");
    tooltip.style.backgroundImage = `url(/change-house-color-wall/assets/images/mau_gach/${flatItem.url})`;
    tooltip.innerHTML = `<span>${flatItem.name}</span>`;

    flatDiv.addEventListener("mousemove", (event) => {
      boxMouseMove(event, tooltip);
    });
    flatDiv.addEventListener("mouseleave", () => {
      boxMouseLeave(tooltip);
    });

    flatDiv.addEventListener("click", () => {
      document.getElementById("idnameFlat").innerHTML = flatItem.name;
      image = imgFlat;
      renderImage();
    });

    flatDiv.appendChild(imgFlat);
    flatDiv.appendChild(tooltip);

    divflat.appendChild(flatDiv);
  });
});

function boxMouseMove(event, tooltip) {
  tooltip.style.opacity = "1";
  tooltip.style.visibility = "visible";

  tooltip.style.width = "150px";
  tooltip.style.height = "150px";

  tooltip.style.left = event.pageX - 20 + "px";
  tooltip.style.top = event.pageY - 20 + "px";
}

function boxMouseLeave(tooltip) {
  tooltip.style.opacity = "0";
  tooltip.style.visibility = "hidden";

  tooltip.style.width = "50px";
  tooltip.style.height = "50px";
}

function listMenu(listData) {
  const { interior_flat } = listData;
  const listMenu = document.querySelector(".menu_navs");

  interior_flat.map((itemFlat) => {
    const menuItem = document.createElement("li");
    menuItem.className = "menu_item";
    menuItem.style.cursor = "pointer";
    menuItem.innerText = itemFlat?.name;
    menuItem.addEventListener("click", () => {
      document.querySelector(
        ".imgNoiThat"
      ).src = `/change-house-color-wall/assets/images/noithat-san/${itemFlat?.url}`;
    });
    listMenu.appendChild(menuItem);
  });
}
