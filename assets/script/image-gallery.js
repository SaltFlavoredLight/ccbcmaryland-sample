class AspectRatioScroller {
    constructor(container, options = {}) {
        this.container = container;
        this.track = container.querySelector('.image-gallery-track');
        this.items = Array.from(this.track.children);
        this.speedNormal = options.speedNormal || 0.5;
        this.speedHover = options.speedHover || 2;
        this.speed = this.speedNormal;
        this.position = options.startPos || 0.5;

        this.cloneItems();
        this.bindEvents();
        this.animate();
    }

    cloneItems() {
        const containerWidth = this.container.offsetWidth;
        let trackWidth = this.track.scrollWidth;
        let clones = [];

        // Keep cloning until track is wider than container
        let i = 0;
        while (trackWidth < containerWidth && i < 100) {
            const clone = this.items[i % this.items.length].cloneNode(true);
            this.track.appendChild(clone);
            clones.push(clone);
            trackWidth = this.track.scrollWidth;
            i++;
        }

        // Then duplicate the entire filled set for seamless loop
        [...this.items, ...clones].forEach(item => {
            this.track.appendChild(item.cloneNode(true));
        });
    }


    bindEvents() {
        this.container.addEventListener('mouseenter', () => {
            this.speed = this.speedHover;
        });

        this.container.addEventListener('mouseleave', () => {
            this.speed = this.speedNormal;
        });
    }

    animate() {
        this.position -= this.speed;
        if (Math.abs(this.position) >= this.track.scrollWidth / 2) {
            this.position = 0;
        }
        this.track.style.transform = `translateX(${this.position}px)`;
        requestAnimationFrame(() => this.animate());
    }
}

document.querySelectorAll('.image-gallery').forEach(gallery => {
    new AspectRatioScroller(gallery, {
        speedNormal: 1,
        speedHover: 1,
        startPos: -300
    });
});