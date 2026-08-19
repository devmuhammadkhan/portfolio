(function () {
    'use strict';

    const items = document.querySelectorAll('.kinetic-item');
    const preview = document.getElementById('hoverPreview');
    const svgContainer = document.getElementById('svgContainer');
    const previewTitle = document.getElementById('previewTitle');
    const previewTech = document.getElementById('previewTech');
    const previewUrl = document.getElementById('previewUrl');

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const svgIcons = {
        ai: `<svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`,
        tracker: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
        edu: `<svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 6 2 6 2s6 0 6-2v-5"/></svg>`,
        academic: `<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
    };

    const itemInfo = {
        ai: { title: 'cl200 AI Platform', tech: 'GROQ API • AI ASSISTANT' },
        tracker: { title: 'TrackBud Pro', tech: 'WEB UTILITY • PRODUCTIVITY' },
        edu: { title: 'Al-Bashir School Portal', tech: 'INSTITUTIONAL PLATFORM' },
        academic: { title: 'Dr. Atif Nawaz Portfolio', tech: 'ACADEMIC • MINIMALIST' }
    };

    const openItem = (item) => {
        const link = item.getAttribute('data-link');
        if (link) window.open(link, '_blank', 'noopener');
    };

    /* ---------- Cursor-follow preview (rAF throttled) ---------- */
    if (preview && !reduceMotion) {
        let ticking = false;
        window.addEventListener('mousemove', (e) => {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(() => {
                preview.style.left = `${e.clientX}px`;
                preview.style.top = `${e.clientY}px`;
                ticking = false;
            });
        }, { passive: true });
    }

    /* ---------- Item interactions ---------- */
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!preview) return;
            const type = item.getAttribute('data-type');
            const link = item.getAttribute('data-link');
            const info = itemInfo[type] || { title: '', tech: '' };
            svgContainer.innerHTML = svgIcons[type] || '';
            previewTitle.textContent = info.title;
            previewTech.textContent = info.tech;
            previewUrl.textContent = link.replace('https://', '');
            preview.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            if (preview) preview.classList.remove('active');
        });

        item.addEventListener('click', () => openItem(item));

        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openItem(item);
            }
        });
    });
})();
