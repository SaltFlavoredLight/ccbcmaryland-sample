/* Copyright (C) 2025 Ray Zuo, S.D.G. , MIT licence. see /README.md */

const openStikey = 1; // set 0 if you don't want this!
const topBanner = document.querySelector('.top-banner');
const toggle = document.querySelector('.page-top');

if (openStikey && topBanner && toggle) {
    const observer = new IntersectionObserver(
        ([entry]) => {
            topBanner.classList.toggle('is-sticky', entry.intersectionRatio < 1);
        },
        { threshold: [1] }
    );

    observer.observe(toggle);
}
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("top-banner-hamburger");
    const navMenu = document.querySelector(".top-banner-nav-menu");
    const hambergerLineT = document.getElementById("top-banner-hamberger-line-t");
    const hambergerLineM = document.getElementById("top-banner-hamberger-line-m");
    const hambergerLineB = document.getElementById("top-banner-hamberger-line-b");
    let isOpen = false;

    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const direction = isOpen ? "reverse" : "normal";
        hambergerLineT.style.animation = `none`;
        hambergerLineM.style.animation = `none`;
        hambergerLineB.style.animation = `none`;
        void hambergerLineT.offsetWidth; // 强制重绘以重新触发动画
        void hambergerLineM.offsetWidth; // 强制重绘以重新触发动画
        void hambergerLineB.offsetWidth; // 强制重绘以重新触发动画
        hambergerLineT.style.animation = `hamburger-toggle-T 0.6s ease-in-out forwards ${direction}`;
        hambergerLineM.style.animation = `hamburger-toggle-M 0.6s ease-in-out forwards ${direction}`;
        hambergerLineB.style.animation = `hamburger-toggle-B 0.6s ease-in-out forwards ${direction}`;
        isOpen = !isOpen;
    });
}); 