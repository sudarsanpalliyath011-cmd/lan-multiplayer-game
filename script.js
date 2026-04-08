const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: 100, y: 100, size: 20 };
let otherPlayer = { x: 200, y: 200, size: 20 };

let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// 🔥 SIMPLE LOCAL STORAGE "FAKE NETWORK"
function sendData() {
    localStorage.setItem("player", JSON.stringify(player));
}

function receiveData() {
    let data = localStorage.getItem("player");
    if (data) {
        otherPlayer = JSON.parse(data);
    }
}

function update() {
    if (keys["w"]) player.y -= 3;
    if (keys["s"]) player.y += 3;
    if (keys["a"]) player.x -= 3;
    if (keys["d"]) player.x += 3;

    sendData();
    receiveData();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // You
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Other player
    ctx.fillStyle = "red";
    ctx.fillRect(otherPlayer.x, otherPlayer.y, otherPlayer.size, otherPlayer.size);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
