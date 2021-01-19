const canvas = document.getElementById('canvasTest');
const ctx = canvas.getContext('2d');


let gyroscope = new Gyroscope({frequency: 60});

gyroscope.addEventListener('reading', e => {
  console.log("Angular velocity along the X-axis " + gyroscope.x);
  console.log("Angular velocity along the Y-axis " + gyroscope.y);
  console.log("Angular velocity along the Z-axis " + gyroscope.z);
});
gyroscope.start();

var circleToMove = []
let x = 0
let y = 0
canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

function createCircle(x,y,radius,offset,color){
    let obj= {
        x:x,
        y:y,
        radius:radius,
        offset:offset,
        color:color,
    }
    circleToMove.push(obj)
}
createCircle(50,50,30,0,"red")

function gameLoop() {
    ctx.fillStyle = "white"
    ctx.fillRect (0,0,canvas.width, canvas.height)

    circleToMove.forEach(element => {
        ctx.beginPath();
        ctx.fillStyle = element.color
        ctx.arc(element.x, element.y, element.radius, element.offset, 2 * Math.PI);
        ctx.fill()
        ctx.stroke();
    });

}
setInterval(gameLoop, 1000 / 60)