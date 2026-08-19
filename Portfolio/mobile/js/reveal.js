(function () {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll('.reveal');

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('in-view'));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Array.prototype.indexOf.call(revealEls, entry.target);
                    entry.target.style.transitionDelay = Math.min(index * 0.06, 0.4) + 's';
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

        revealEls.forEach(el => revealObserver.observe(el));
    }

    const header = document.getElementById('mHeader');
    if (header) {
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const onProgress = () => {
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            progressBar.style.width = max > 0 ? (doc.scrollTop / max * 100) + '%' : '0%';
        };
        onProgress();
        window.addEventListener('scroll', onProgress, { passive: true });
        window.addEventListener('resize', onProgress, { passive: true });
    }
})();
