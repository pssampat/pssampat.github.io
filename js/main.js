// Global Shared Interactions Logic
// Handles navigation overlays, mobile drawer toggles, and persistent site-wide UI functionality.

document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let menuOpen = false;

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            menuOpen = !menuOpen;
            if (menuOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('flex');
                setTimeout(() => mobileMenu.classList.remove('opacity-0'), 10);
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.add('opacity-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    }
});
