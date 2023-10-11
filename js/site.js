const canvas = document.getElementById('skiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const createSkier = (type) => {
    return {
        type: type,
        x: Math.random() * canvas.width,
        y: type === 'notSkiing' ? canvas.height - 20 : 0,
        speed: Math.random() * 3 + 2,
        turnInterval: type === 'sCurve' ? Math.floor(Math.random() * 100) + 50 : null,
        move: function() {
            if (this.type === 'frenchfry') {
                this.y += this.speed;
            } else if (this.type === 'sCurve') {
                this.x += this.speed * Math.sin(this.y / 100);
                this.y += this.speed;
            }
            if (this.y > canvas.height && this.type !== 'notSkiing') {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        },
        draw: function() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = this.type === 'notSkiing' ? 'red' : 'blue';
            ctx.fill();
        }
    }
};

let skiers = [];
for (let i = 0; i < 3; i++) {
    skiers.push(createSkier('frenchfry'));
}
for (let i = 0; i < 3; i++) {
    skiers.push(createSkier('sCurve'));
}
for (let i = 0; i < 4; i++) {
    skiers.push(createSkier('notSkiing'));
}

class Snowflake {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 3 + 1;
    }
    move() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

const snowflakes = Array(100).fill().map(() => new Snowflake());

const drawMountain = () => {
    ctx.fillStyle = '#AAA';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 100);
    ctx.lineTo(canvas.width, canvas.height - 100);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.closePath();
    ctx.fill();
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawMountain(); try to improve this with a .jpg and then set parameters maybe...
    for (let skier of skiers) {
        skier.move();
        skier.draw();
    }
    for (let snowflake of snowflakes) {
        snowflake.move();
        snowflake.draw();
    }
    requestAnimationFrame(animate);
}

animate();
