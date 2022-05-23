const canvas = document.querySelector("canvas");
const treeButton = document.querySelector(".tree-button");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let curve = Math.random() * 10 + 10;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = color1;
  ctx.fillStyle = color2;
  ctx.shadowBlur = 10;
  ctx.shadowColor = color2;
  ctx.lineWidth = branchWidth;
  ctx.translate(startX, startY);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.moveTo(0, 0);
  //ctx.lineTo(0, -len);
  if (angle < 0) {
    ctx.bezierCurveTo(curve, -len / 2, 10, -len / 2, 0, -len);
  } else {
    ctx.bezierCurveTo(curve, -len / 2, -5, -len / 2, 0, -len);
  }
  ctx.stroke();

  if (len < 5) {
    //leaves
    ctx.beginPath();
    ctx.arc(0, -len, len + 5, 0, Math.PI / 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  drawTree(0, -len, len * 0.75, angle + curve, branchWidth * 0.6);
  drawTree(0, -len, len * 0.75, angle - curve, branchWidth * 0.6);

  ctx.restore();
}

drawTree(canvas.width / 2, canvas.height - 80, 150, 0, 15, "brown", "green");

function generateTree() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //startX, startY, len, angle, branchWidth, color1, color2
  let centerX = canvas.width / 2;
  let len = Math.floor(Math.random() * 130 + 50);
  let angle = Math.random() * 10 - 5;
  let branchWidth = Math.random() * 40 + 1;
  let color1 =
    "rgb(" +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    ")";
  let color2 =
    "rgb(" +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    ")";
  treeButton.style.background = color1;
  treeButton.style.color = color2;
  curve = Math.random() * 10 + 10;
  let gitlink = document.querySelector(".git-link");
  gitlink.style.color = color2;
  drawTree(
    centerX,
    canvas.height - 80,
    len,
    angle,
    branchWidth,
    color1,
    color2
  );
}

treeButton.addEventListener("click", generateTree);
