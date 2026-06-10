const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

const BASE_WIDTH = 2300;
const BASE_HEIGHT = 1000;

let particles = [];
const PARTICLE_COUNT = 1143;

/* ===============================
   CANVAS RESOLUTION FIX (NO BLUR)
================================= */
function setupCanvas() {

    const dpr = window.devicePixelRatio || 1;

    // Internal resolution high rakho
    canvas.width = BASE_WIDTH * dpr;
    canvas.height = BASE_HEIGHT * dpr;

    // Visual size fixed
    canvas.style.width = BASE_WIDTH + "px";
    canvas.style.height = BASE_HEIGHT + "px";

    // Scale drawing back
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

/* ===============================
   PARTICLE CLASS
================================= */
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * BASE_WIDTH;
        this.y = Math.random() * BASE_HEIGHT;

        // Better balanced size
        this.size = Math.random() * 2 + 1.5;
        this.speed = Math.random() * 1 + 1.5;
        this.opacity = Math.random();

        this.colors = [
            "0,255,100",
            "165,42,42",
            "0,150,255",
            "255,255,255"
        ];

        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    update() {
        this.y += this.speed;

        if (this.y > BASE_HEIGHT) {
            this.y = 0;
            this.x = Math.random() * BASE_WIDTH;
        }
    }

    draw() {
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.size, this.size * 2);
    }
}

/* ===============================
   INIT PARTICLES
================================= */
function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

/* ===============================
   ANIMATION LOOP
================================= */
function animateParticles() {
    ctx.clearRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animateParticles);
}

/* ===============================
   HOME WRAPPER SCALE (1400x900 FIXED)
================================= */
function scaleHome() {

    const wrapper = document.querySelector(".home-wrapper");

    const scaleX = window.innerWidth / BASE_WIDTH;
    const scaleY = window.innerHeight / BASE_HEIGHT;

    const scale = Math.min(scaleX, scaleY);

    wrapper.style.transform =
        `translate(-50%, -50%) scale(${scale})`;
}

/* ===============================
   START EVERYTHING
================================= */
window.addEventListener("load", () => {
    setupCanvas();
    initParticles();
    animateParticles();
    scaleHome();
});

window.addEventListener("resize", () => {
    scaleHome();
});