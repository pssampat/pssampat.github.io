async function loadProjects() {
    try {
        const response = await fetch('assets/projects.json');
        const data = await response.json();
        const projectsContainer = document.getElementById('projects-container');

        if (!projectsContainer) return;

        // Clear existing content if any (though we'll likely empty the categories in HTML)
        projectsContainer.innerHTML = '';

        for (const [category, projects] of Object.entries(data)) {
            const section = document.createElement('section');
            section.className = 'category';
            
            const h2 = document.createElement('h2');
            h2.textContent = category;
            section.appendChild(h2);

            const track = document.createElement('div');
            track.className = 'poster-track';
            
            const trackInner = document.createElement('div');
            trackInner.className = 'poster-track';

            projects.forEach(project => {
                const poster = document.createElement('div');
                poster.className = 'poster';
                poster.dataset.title = project.title;
                poster.dataset.role = project.role;
                poster.dataset.link = project.link;
                poster.dataset.desc = project.desc;
                poster.dataset.image = project.image;

                const img = document.createElement('img');
                img.alt = project.title;
                img.src = project.image;
                
                const roleDiv = document.createElement('div');
                roleDiv.className = 'film_role';
                roleDiv.textContent = project.role.toUpperCase();

                poster.appendChild(img);
                poster.appendChild(roleDiv);
                trackInner.appendChild(poster);

                // Add click listener for popup
                poster.addEventListener('click', () => {
                    openPopup(project);
                });
            });

            track.appendChild(trackInner);
            section.appendChild(track);
            projectsContainer.appendChild(section);
        }
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function openPopup(project) {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("popup-overlay");
    const title = document.getElementById("popup-title");
    const role = document.getElementById("popup-role");
    const desc = document.getElementById("popup-desc");
    const link = document.getElementById("popup-link");
    const image = document.getElementById("popup-image");

    image.src = project.image;
    title.textContent = project.title;
    role.textContent = project.role;
    desc.textContent = project.desc;
    link.href = project.link;

    popup.classList.add("show");
    overlay.classList.add("show");
}

// Global functions for closing (referenced in index.html)
window.closePopup = function() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("popup-overlay");
    popup.classList.remove("show");
    overlay.classList.remove("show");
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();

    // Close button listener
    const closeBtn = document.querySelector(".popup-close");
    if (closeBtn) {
        closeBtn.addEventListener("click", closePopup);
    }

    // ESC close
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closePopup();
    });

    // click outside close
    const overlay = document.getElementById("popup-overlay");
    if (overlay) {
        overlay.addEventListener("click", closePopup);
    }
});
