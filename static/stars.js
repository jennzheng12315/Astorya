// Modified from: 
// https://yossiabramov.com/blog/vanilla-js-starry-night
// https://dev.to/nicm42/creating-stars-using-javascript-46ca

function random(min, max) {
    return min + Math.random() * (max + 1 - min);
}

function createStars() {
    const el = document.getElementById('body');

    for (let i = 0; i < 200; i++) {
        // Set up random elements
        let xPos = random(0, el.offsetWidth);
        let yPos = random(0, el.offsetHeight);
        let alpha = random(0.5, 1);
        let size = random(1, 2);

        // Add them to the body
        const star = document.createElement('div');
        star.classList.add("star");
        star.ariaHidden = "true";
        star.style.left = xPos + 'px';
        star.style.top = yPos + 'px';
        star.style.opacity = alpha;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.setProperty(
            "--twinkle-duration",
            Math.ceil(random(1, 5)) + "s"
        );
        star.style.setProperty(
            "--twinkle-delay",
            Math.ceil(random(1, 5)) + "s"
        );
        document.body.appendChild(star);
    }
}