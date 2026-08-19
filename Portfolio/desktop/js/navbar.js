(function () {
    'use strict';

    const navbar = document.getElementById('mainNav');
    const aboutSection = document.getElementById('about');
    const progressBar = document.getElementById('progressBar');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Nav reveal at About section ---------- */
    if (navbar && aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navbar.classList.add('visible');
                } else if (window.scrollY < entry.boundingClientRect.top) {
                    navbar.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(aboutSection);
    }

    /* ---------- Scroll progress bar ---------- */
    if (progressBar) {
        const onScroll = () => {
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            progressBar.style.width = max > 0 ? (doc.scrollTop / max * 100) + '%' : '0%';
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
    }

    /* ---------- Shared scroll reveal ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length && !reduceMotion) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('in-view'));
    }
})();
