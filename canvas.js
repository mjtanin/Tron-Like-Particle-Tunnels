const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight - 20;
canvas.width = innerWidth - 20;

addEventListener('resize', () => {
    canvas.height = innerHeight - 20;
    canvas.width = innerWidth - 20;

});

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const gravity = 0.005;
const firction = 0.99;


class Balls {
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.velocity = velocity;
        this.ttl = 100;
    
        
    }
    draw = function() {
        c.save()
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
        c.restore()
    }

    update = function() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.ttl --
    }

}

function randomColor(){
    const r = Math.floor((Math.random() * 256));
    const g = Math.floor((Math.random() * 256));
    const b = Math.floor((Math.random() * 256));
    const a = 1 //(Math.round(Math.random() * 100)) / 100;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}



addEventListener('mousemove', ballsBlast)

function ballsBlast(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

}

let balls = []

setInterval(() => {
    const radius = 5;

    const ballCount = 100;
    const radian = (Math.PI * 2) / ballCount;

    for (let i = 0; i < ballCount; i++) {
        const circle = new Balls(mouse.x, mouse.y, radius, randomColor(), {
            x: Math.cos(radian * i) * 2, 
            y: Math.sin(radian * i) * 2
        })
        balls.push(circle);
    }
    // console.log(balls);
}, 500)

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = 'rgba(0, 0, 0, 1)'
    c.fillRect(0, 0, innerWidth, innerHeight);

    balls.forEach((ball, i) => {
        console.log(ball.ttl);
        if(ball.ttl < 0){
            balls.splice(i, 1)
        }
        ball.update()
    })

}

animate()
