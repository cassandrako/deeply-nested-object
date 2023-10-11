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
                if (Math.floor(this.y % this.turnInterval) === 0) {
                    this.x += this.speed;
                } else {
                    this.y += this.speed;
                }
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

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let skier of skiers) {
        skier.move();
        skier.draw();
    }
    requestAnimationFrame(animate);
}

animate();
