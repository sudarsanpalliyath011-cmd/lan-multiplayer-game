const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: 100, y: 100 };
let other = { x: 200, y: 200 };

let keys = {};

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// 🔥 SIMPLE ONLINE USING PUBLIC SIGNAL (localStorage trick won't work across devices)
// So we simulate with URL room

let room = "";
let isHost = false;

function createRoom() {
    room = Math.random().toString(36).substring(2, 7);
    isHost = true;
    alert("Room Code: " + room);
}

function joinRoom() {
    room = document.getElementById("roomInput").value;
    alert("Joined Room: " + room);
}

function update() {
    if (keys["w"]) player.y -= 3;
    if (keys["s"]) player.y += 3;
    if (keys["a"]) player.x -= 3;
    if (keys["d"]) player.x += 3;

    // FAKE SYNC USING URL HASH (simple trick)
    if (room) {
        location.hash = room + "|" + player.x + "|" + player.y;
    }

    if (location.hash.includes("|")) {
        let data = location.hash.replace("#", "").split("|");
        if (data.length === 3) {
            other.x = parseInt(data[1]);
            other.y = parseInt(data[2]);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, 20, 20);

    ctx.fillStyle = "red";
    ctx.fillRect(other.x, other.y, 20, 20);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

loop();
