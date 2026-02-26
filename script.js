// Preloader
window.addEventListener("load", () => {
    document.querySelector(".preloader").style.display = "none";
});

// Custom Cursor
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.3
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        const dx = (mouseX - canvas.width / 2) * star.speed * 0.01;
        const dy = (mouseY - canvas.height / 2) * star.speed * 0.01;

        ctx.beginPath();
        ctx.arc(star.x + dx, star.y + dy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    });

    requestAnimationFrame(drawStars);
}

drawStars();

function createShootingStar(x, y) {
    let angle = Math.random() * Math.PI * 2;
    let length = 150 + Math.random() * 100;

    let endX = x + Math.cos(angle) * length;
    let endY = y + Math.sin(angle) * length;

    let opacity = 1;

    function animateStar() {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "white";
        ctx.stroke();
        ctx.shadowBlur = 0;

        opacity -= 0.02;

        if (opacity > 0) {
            requestAnimationFrame(animateStar);
        }
    }

    animateStar();
}

function showWishText() {
    const wish = document.createElement("div");
    wish.innerText = "💫 Your wish is on its way...";
    wish.style.position = "fixed";
    wish.style.top = "50%";
    wish.style.left = "50%";
    wish.style.transform = "translate(-50%, -50%)";
    wish.style.fontSize = "1.5rem";
    wish.style.opacity = "1";
    wish.style.transition = "opacity 2s ease";
    document.body.appendChild(wish);

    setTimeout(() => {
        wish.style.opacity = "0";
    }, 1000);

    setTimeout(() => {
        wish.remove();
    }, 3000);
}

window.addEventListener("click", (e) => {
    createShootingStar(e.clientX, e.clientY);
    showWishText();
});

function getNamePoints() {
    const scale = window.innerWidth < 768 ? 0.6 : 1;

    return [
        {x: 200 * scale, y: 200 * scale},
        {x: 230 * scale, y: 250 * scale},
        {x: 260 * scale, y: 200 * scale},
        {x: 290 * scale, y: 250 * scale},
        {x: 320 * scale, y: 200 * scale}
    ];
}

let namePoints = getNamePoints();

window.addEventListener("resize", () => {
    namePoints = getNamePoints();
});

function drawConstellation() {
    ctx.strokeStyle = "rgba(255, 78, 145, 0.8)";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    namePoints.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }

        ctx.fillStyle = "#ff4e91";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawConstellation();
    requestAnimationFrame(animate);
}

animate();

// Typewriter
const message = "Today the universe celebrates you. And I celebrate getting to love you.";
let i = 0;
function typeWriter() {
    if (i < message.length) {
        document.querySelector(".typewriter").innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, 40);
    }
}
typeWriter();

// Music Toggle
const music = document.getElementById("bgMusic");
const toggle = document.getElementById("musicToggle");

toggle.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        toggle.innerText = "Pause Music 🎵";
    } else {
        music.pause();
        toggle.innerText = "Play Music 🎵";
    }
});

// 3D Tilt Effect
const card = document.querySelector(".tilt-card");
card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.transform = `rotateY(${(x - rect.width/2)/20}deg) rotateX(${-(y - rect.height/2)/20}deg)`;
});
card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0) rotateX(0)";
});

// Gallery Auto Slide
const slides = document.querySelectorAll(".slider img");
let index = 0;
setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
}, 3000);

const meterSection = document.querySelector(".love-meter");
const fill = document.querySelector(".fill");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            fill.style.width = "100%";
        }
    });
}, { threshold: 0.5 });

observer.observe(meterSection);

// Hold Surprise + Fireworks
const holdBtn = document.getElementById("holdButton");
let holdTimer;

holdBtn.addEventListener("mousedown", () => {
    holdTimer = setTimeout(() => {
        alert("Surprise! You’re stuck with me forever. 💖");
        createHearts();
    }, 2000);
});

holdBtn.addEventListener("mouseup", () => {
    clearTimeout(holdTimer);
});

// Floating Hearts
function createHearts() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "💖";
        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "100vh";
        heart.style.fontSize = "20px";
        heart.style.animation = "floatUp 3s linear forwards";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000);
    }
}

const sections = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    revealObserver.observe(section);
});

const startDate = new Date("2025-10-22"); // change to your anniversary
const today = new Date();
const diffTime = today - startDate;
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

document.getElementById("daysTogether").innerText = diffDays + " days 💞";

// Easter Egg
console.log("You found the developer console. I love you more than clean code.");