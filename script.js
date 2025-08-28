TITLES_ARRAY = "Creative Technologist"

document.addEventListener('mousemove', function(e) {
    let main_rotation = document.getElementById('main-bg-image-blur');
    let currentRotate = main_rotation.dataset.rotate ? parseFloat(main_rotation.dataset.rotate) : 0;

    let x = e.clientX;
    let y = e.clientY;
    let dist = Math.hypot(x, y)

    let newRotate = currentRotate + dist/1000;
    
    main_rotation.dataset.rotate = newRotate;
    main_rotation.style.transform = `translate(-50%, -50%) rotate(${newRotate}deg) scale(1.44)`;
});
