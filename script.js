let currentX = 0;
let currentY = 0;
let movedX = 0;
let movedY = 0;
let lastScrollY = document.scrollY;

const customCursor = document.getElementById('custom-cursor');
//const hoverTarget = document.querySelector(".topbar");
const topBar = document.getElementById("top-bar");
const mainRotator = document.getElementById('main-bg-image-blur');
const clickGif = document.getElementById("click-effect");
const delayFactor = 0.1;

document.addEventListener('mousemove', function(e) {
    let currentRotate = mainRotator.dataset.rotate ? parseFloat(mainRotator.dataset.rotate) : 0;

    movedX = e.clientX;
    movedY = e.clientY;

    let dist = Math.hypot(movedX, movedY);

    let newRotate = currentRotate + dist/1000;
    
    mainRotator.dataset.rotate = newRotate;
    mainRotator.style.transform = `translate(-50%, -50%) rotate(${newRotate}deg) scale(1.44)`;
});

document.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        topBar.classList.add("hidden");
    } else {
        topBar.classList.remove("hidden");
    }
    lastScrollY = currentScrollY;
});

topBar.addEventListener("mouseenter", () => {
    customCursor.style.opacity = "0";
    setTimeout(() => {
        customCursor.src = "assets/cursor_circle.png"; 
        customCursor.style.opacity = "1";
    }, 150);
});

topBar.addEventListener("mouseleave", () => {
    customCursor.style.opacity = "0"; 
    setTimeout(() => {
        customCursor.src = "assets/cursor.png"; 
        customCursor.style.opacity = "1";
    }, 150);
});

function animateCursor() {
    if (!customCursor) return;
    currentX += (movedX - currentX) * delayFactor;
    currentY += (movedY - currentY) * delayFactor;

    customCursor.style.left = `${currentX}px`;
    customCursor.style.top = `${currentY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();
