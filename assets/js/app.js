const canvasContainer = document.querySelector(".canvas-container");


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
