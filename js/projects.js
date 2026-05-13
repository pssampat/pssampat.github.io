/* ===================================================
   projects.js — Multi-page data logic
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Only run project logic if on the projects page
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        initProjectsPage();
    }

    // Lightbox for Personal Works
    const lightboxClose = document.getElementById('lightbox-close');
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
        document.getElementById('lightbox-overlay').addEventListener('click', (e) => {
            if (!e.target.closest('#lightbox-image') && e.target.id !== 'lightbox-close') closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
        });
        initLightboxPanZoom();
    }

    // Scroll Progress
    initScrollProgress();
});

let allProjectsData = {};
let personalWorksData = [];

async function initProjectsPage() {
    try {
        const [projectsResponse, personalWorksResponse] = await Promise.all([
            fetch('assets/projects.json'),
            fetch('assets/personal_works.json')
        ]);
        
        allProjectsData = await projectsResponse.json();
        personalWorksData = await personalWorksResponse.json();

        setupFilters();
        
        // Default to first tab
        const defaultTab = document.querySelector('.category-btn.active');
        if (defaultTab) {
            renderCategory(defaultTab.dataset.category);
        } else {
            renderCategory('FEATURE FILMS');
        }

    } catch (err) {
        console.error('Error loading projects:', err);
    }
}

function setupFilters() {
    const filterNav = document.getElementById('category-filters');
    if (!filterNav) return;

    filterNav.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            filterNav.querySelectorAll('.category-btn').forEach(b => {
                b.classList.remove('active');
                b.classList.add('text-on-surface-variant');
                b.classList.remove('text-primary');
                b.style.borderBottom = 'none';
            });
            btn.classList.add('active', 'text-primary');
            btn.classList.remove('text-on-surface-variant');
            btn.style.borderBottom = '1px solid #e1fdff';
            
            renderCategory(btn.dataset.category);
        });
    });
}

function renderCategory(category) {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';
    
    let itemsToRender = [];
    let isPersonalView = false;

    if (category === 'PERSONAL_WORKS') {
        itemsToRender = personalWorksData;
        isPersonalView = true;
    } else if (allProjectsData[category]) {
        itemsToRender = allProjectsData[category];
    }

    itemsToRender.forEach((project, index) => {
        const card = buildProjectCard(project, category, index, isPersonalView);
        container.appendChild(card);
    });
}

function buildProjectCard(project, categoryLabel, index, isPersonal) {
    const isEven = index % 2 === 0;
    const wrapper = document.createElement('div');
    wrapper.className = 'group relative project-card';
    
    const clickHandler = isPersonal 
        ? `openLightbox('${project.image}')` 
        : (project.link ? `window.open('${project.link}', '_blank')` : '');

    const cursorStyle = clickHandler ? 'cursor-pointer' : 'cursor-default';
    
    // Play button only makes sense if it's a video link (not personal works, and has a link)
    const showPlayButton = !isPersonal && project.link;
    
    const playBtnHTML = showPlayButton ? `
        <div class="absolute bottom-4 right-4 md:inset-0 md:flex md:items-center md:justify-center z-20 
                    md:bg-black/30 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="w-12 h-12 md:w-16 md:h-16 rounded-full border border-primary-container flex items-center justify-center bg-background/80 md:bg-background/50 backdrop-blur shadow-[0_0_15px_rgba(0,242,255,0.3)]">
                <span class="material-symbols-outlined text-primary-container text-2xl md:text-3xl ml-1">play_arrow</span>
            </div>
        </div>
    ` : '';

    const categoryVerticalText = (index === 0) ? `
        <div class="absolute -left-12 top-0 flex-col items-center hidden md:flex">
            <span class="font-vertical-label text-vertical-label text-outline rotate-180"
                  style="writing-mode:vertical-lr">${categoryLabel.replace(/ /g, '_')}</span>
            <div class="w-[1px] h-20 bg-white/10 mt-4"></div>
        </div>
    ` : '';

    wrapper.innerHTML = `
        ${categoryVerticalText}
        
        <div class="aspect-square bg-surface-container-low overflow-hidden ghost-border backdrop-blur-sm relative
             group-hover:scale-[1.02] transition-transform duration-700 ease-out ${cursorStyle}"
             onclick="${clickHandler}">
            
            <img class="w-full h-full object-cover filter saturate-[0.8] brightness-[0.9]
                        group-hover:saturate-100 group-hover:brightness-100 transition-all duration-700"
                 src="${project.image}" alt="${project.title}" loading="lazy"/>
                 
            ${playBtnHTML}
        </div>
        
        <div class="mt-6 flex flex-col gap-2">
            <h2 class="font-headline-md text-[clamp(24px,3vw,32px)] text-primary leading-tight font-bold">${project.title}</h2>
            ${project.role ? `<p class="font-technical-sm text-xs text-primary-container uppercase tracking-widest">${project.role}</p>` : ''}
            ${project.desc ? `<p class="font-body-main text-sm text-on-surface-variant font-light mt-2 max-w-lg leading-relaxed">${project.desc}</p>` : ''}
        </div>
    `;
    return wrapper;
}

/* ---- LIGHTBOX (Personal Works) ---- */

let currentScale = 1;
let translateX = 0;
let translateY = 0;
let isPanning = false;
let startX = 0;
let startY = 0;

function updateLightboxTransform() {
    const img = document.getElementById('lightbox-image');
    if (!img) return;
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
}

function openLightbox(imgSrc) {
    const overlay = document.getElementById('lightbox-overlay');
    const img = document.getElementById('lightbox-image');
    if (!overlay || !img) return;
    
    img.src = imgSrc;
    
    // Reset transform on open
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    updateLightboxTransform();
    
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    
    // small delay to allow display:block to apply before animating opacity
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const overlay = document.getElementById('lightbox-overlay');
    if (!overlay) return;
    
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.classList.remove('flex');
        document.body.style.overflow = '';
    }, 300);
}

function initLightboxPanZoom() {
    const img = document.getElementById('lightbox-image');
    const overlay = document.getElementById('lightbox-overlay');
    if (!img || !overlay) return;

    img.style.transition = 'transform 0.1s ease-out';
    img.style.cursor = 'grab';

    // Prevent default drag
    img.addEventListener('dragstart', (e) => e.preventDefault());

    // Zoom with wheel
    overlay.addEventListener('wheel', (e) => {
        if (overlay.classList.contains('hidden')) return;
        e.preventDefault(); 
        const zoomSpeed = 0.1;
        if (e.deltaY < 0) {
            currentScale += zoomSpeed;
        } else {
            currentScale -= zoomSpeed;
        }
        currentScale = Math.min(Math.max(0.5, currentScale), 5);
        updateLightboxTransform();
    }, { passive: false });

    // Pan with mouse
    img.addEventListener('mousedown', (e) => {
        e.preventDefault();
        isPanning = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        img.style.cursor = 'grabbing';
        img.style.transition = 'none';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateLightboxTransform();
    });

    window.addEventListener('mouseup', () => {
        if (isPanning) {
            isPanning = false;
            img.style.cursor = 'grab';
            img.style.transition = 'transform 0.1s ease-out';
        }
    });

    // Touch support for Pan and Pinch-to-Zoom
    let initialPinchDistance = null;
    let initialScale = 1;

    overlay.addEventListener('touchstart', (e) => {
        if (overlay.classList.contains('hidden')) return;
        if (e.touches.length === 1) {
            isPanning = true;
            startX = e.touches[0].clientX - translateX;
            startY = e.touches[0].clientY - translateY;
            img.style.transition = 'none';
        } else if (e.touches.length === 2) {
            isPanning = false;
            initialPinchDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            initialScale = currentScale;
            img.style.transition = 'none';
        }
    }, { passive: false });

    overlay.addEventListener('touchmove', (e) => {
        if (overlay.classList.contains('hidden')) return;
        
        if (isPanning && e.touches.length === 1) {
            e.preventDefault();
            translateX = e.touches[0].clientX - startX;
            translateY = e.touches[0].clientY - startY;
            updateLightboxTransform();
        } else if (e.touches.length === 2 && initialPinchDistance) {
            e.preventDefault();
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            const pinchRatio = currentDistance / initialPinchDistance;
            currentScale = Math.min(Math.max(0.5, initialScale * pinchRatio), 5);
            updateLightboxTransform();
        }
    }, { passive: false });

    overlay.addEventListener('touchend', (e) => {
        if (e.touches.length < 2) {
            initialPinchDistance = null;
        }
        if (e.touches.length === 0) {
            isPanning = false;
            img.style.transition = 'transform 0.1s ease-out';
        }
    });
}

/* ---- SCROLL PROGRESS BAR ---- */

function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
}
