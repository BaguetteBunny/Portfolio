let currentX = 0;
let currentY = 0;
let movedX = 0;
let movedY = 0;
let lastScrollY = document.scrollY;
let startTime = null;

const customCursor = document.getElementById('custom-cursor');
const mainText = document.getElementById("main-text");
const mainSubtext = document.getElementById("main-subtext");
const mainDesc = document.getElementById("main-description");
const pfpWrapper = document.getElementById("info-pfp-wrapper");
const pfp = document.getElementById("info-pfp");
const topBar = document.getElementById("top-bar");
const mainRotator = document.getElementById('main-bg-image-blur');
const clickGif = document.getElementById("click-effect");
const container = document.getElementById("info-technologies-container");
const tooltip = document.getElementById("info-tooltip");

const delayFactor = 0.15;
const amplitude = 5;
const period = 3000;

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

function cursorChangeImage(elementOnHover, newImage, oldImage = "assets/cursor.png") {
    elementOnHover.addEventListener("mouseenter", () => {
        customCursor.style.opacity = "0";
        setTimeout(() => {
            customCursor.src = newImage; 
            customCursor.style.opacity = "1";
        }, 150);
    });
    elementOnHover.addEventListener("mouseleave", () => {
        customCursor.style.opacity = "0";
        setTimeout(() => {
            customCursor.src = oldImage; 
            customCursor.style.opacity = "1";
        }, 150);
    });
}

function animateCursor() {
    if (!customCursor) return;
    currentX += (movedX - currentX) * delayFactor;
    currentY += (movedY - currentY) * delayFactor;

    customCursor.style.left = `${currentX}px`;
    customCursor.style.top = `${currentY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();
cursorChangeImage(topBar, "assets/cursor_circle.png");
cursorChangeImage(mainText, "assets/cursor_circle_blue.png");
cursorChangeImage(mainSubtext, "assets/cursor_circle_red.png");
cursorChangeImage(mainDesc, "assets/cursor_circle_red.png");
cursorChangeImage(pfpWrapper, "assets/cursor_circle_blue.png");

pfpWrapper.addEventListener("mouseenter", () => {
    pfp.style.opacity = "0";
    setTimeout(() => {
        customCursor.style.opacity = "1";
        pfp.src = "assets/pfp_silly.png"; 
        pfp.style.opacity = "1";
        pfp.style.transform = `rotate(0deg)`;
    }, 150);
});
pfpWrapper.addEventListener("mouseleave", () => {
    pfp.style.opacity = "0";
    setTimeout(() => {
        customCursor.style.opacity = "1";
        pfp.src = "assets/pfp.jpg"; 
        pfp.style.opacity = "1";
        pfp.style.transform = `rotate(60deg)`;
    }, 150);
});

container.querySelectorAll("img").forEach(img => {
  img.addEventListener("mouseenter", () => {
    tooltip.textContent = img.alt;
    tooltip.style.opacity = "1";
  });

  img.addEventListener("mousemove", (e) => {
    tooltip.style.top = e.clientY - 20 + "px";
    const rect = tooltip.getBoundingClientRect();
    tooltip.style.left = (e.clientX - rect.width / 2) + "px";
  });


  img.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });
});