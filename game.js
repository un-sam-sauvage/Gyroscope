const canvas = document.getElementById('canvasTest');
const ctx = canvas.getContext('2d');


let gyroscope = new Gyroscope({
    frequency: 60
});

let gyroValue = {
    x: 0,
    y: 0,
    z: 0
}

gyroscope.addEventListener('reading', e => {
    gyroValue.x += gyroscope.x
    gyroValue.y += gyroscope.y
    gyroValue.z += gyroscope.z
    document.getElementById("gyro").innerHTML = Math.floor(gyroValue.x) + "<br>" + Math.floor(gyroValue.y) + "<br>" + Math.floor(gyroValue.z)
});
gyroscope.start();
var result = document.querySelector('.result')
result.innerHTML = "x" + gyroscope.x + " ";
result.innerHTML += "y" + gyroscope.y + " ";

var circleToMove = []
let x = 0
let y = 0
canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;


function createCircle(x, y, radius, offset, color) {
    let obj = {
        x: x,
        y: y,
        radius: radius,
        offset: offset,
        color: color,
    }
    circleToMove.push(obj)
}
createCircle(50, 50, 30, 0, "red")

function gameLoop() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    circleToMove.forEach(element => {
        element.x = gyroValue.z
        element.y = gyroValue.y
        ctx.beginPath();
        ctx.fillStyle = element.color
        ctx.arc(element.x, element.y, element.radius, element.offset, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();
    });


}
setInterval(gameLoop, 1000 / 60)