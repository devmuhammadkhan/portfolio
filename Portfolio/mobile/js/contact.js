(function () {
    'use strict';

    const WHATSAPP_NUMBER = '923328662897';
    const form = document.getElementById('contactForm');
    const note = document.getElementById('formNote');

    if (!form) return;

    const showNote = (message) => {
        note.textContent = message;
        note.hidden = false;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const msg = form.msg.value.trim();

        if (!name || !msg) {
            showNote('Please enter your name and message.');
            return;
        }
        if (email && !/^\S+@\S+\.\S+$/.test(email)) {
            showNote('Please enter a valid email address.');
            return;
        }

        const text = [
            'NEW CONTACT — PORTFOLIO PORTAL',
            '',
            'Name: ' + name,
            'Email: ' + (email || '—'),
            '',
            'Message:',
            msg
        ].join('\n');

        window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
        showNote('WhatsApp is opening with your message — ready to send.');
        form.reset();
    });
})();
