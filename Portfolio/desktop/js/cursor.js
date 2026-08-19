(function () {
    'use strict';

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion) return;

    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);

    document.addEventListener('mousemove', (e) => {
        dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
    }, { passive: true });

    const magnetic = document.querySelectorAll('.btn-primary, .btn-secondary');
    magnetic.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const r = btn.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
})();
