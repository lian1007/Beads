const canvas = document.getElementById('braceletCanvas');
const ctx = canvas.getContext('2d');

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 150;

let placedBeads = [];

// 畫圓形手環
function drawBracelet() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 圓形路徑
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = '#aaa';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 畫已放置的珠子圖片
  placedBeads.forEach((bead, i) => {
    const angle = (i / placedBeads.length) * (Math.PI * 2) - Math.PI / 2;
    const beadX = centerX + radius * Math.cos(angle);
    const beadY = centerY + radius * Math.sin(angle);

    const img = new Image();
    img.src = bead.src;
    img.onload = () => {
      ctx.drawImage(img, beadX - 25, beadY - 25, 50, 50);
    };
  });
}

drawBracelet();

// 拖曳事件
let draggedSrc = null;

document.querySelectorAll('.bead').forEach((bead) => {
  bead.addEventListener('dragstart', (e) => {
    draggedSrc = e.target.dataset.src;
  });
});

canvas.addEventListener('dragover', (e) => {
  e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
  e.preventDefault();
  if (draggedSrc) {
    placedBeads.push({ src: draggedSrc });
    drawBracelet();
    draggedSrc = null;
  }
});
