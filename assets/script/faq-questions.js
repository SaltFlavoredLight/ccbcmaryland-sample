/* Copyright (C) 2025 Ray Zuo, S.D.G. , MIT licence. see /README.md */

document.querySelectorAll('.faq-questions-item').forEach((oneItem, index) => {
    const question = oneItem.querySelector(".faq-questions-item-question");
    const answer = oneItem.querySelector('.faq-questions-item-answer');

    const isFirst = index === 0;

    if (!isFirst) {
        oneItem.classList.add('closed');
        answer.style.maxHeight = "0px";
    } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
    }

    const togglefaq = () => {
        oneItem.classList.toggle('closed');
        const isOpen = !oneItem.classList.contains('closed');
        question.setAttribute('aria-expanded', isOpen);

        if (isOpen) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            requestAnimationFrame(() => {
                answer.style.maxHeight = "0px";
            });
        }
    };

    question.addEventListener('click', togglefaq);

    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglefaq();
        }
    });
});
