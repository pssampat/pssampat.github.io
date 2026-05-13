// Homepage Dynamic Background Collage Populator
// Dynamically fetches projects.json, categorizes assets based on medium and role, and renders infinite scrolling tracks.

document.addEventListener('DOMContentLoaded', () => {
    const track1 = document.getElementById('hero-track-1');
    if (!track1) return; // Only execute if hero tracks exist on the active page

    fetch('assets/projects.json')
        .then(res => res.json())
        .then(data => {
            const supervisorAndLeadAssets = [];
            const atdAssets = [];
            const generalAssets = [];

            // Dynamically categorize every project based on medium and role directly from JSON
            Object.entries(data).forEach(([category, items]) => {
                if (!Array.isArray(items)) return;
                items.forEach(item => {
                    if (!item || !item.image) return;
                    const role = (item.role || "").toLowerCase();
                    const isLiveAction = category !== "ANIMATION";
                    const isSupOrLead = role.includes("supervisor") || role.includes("lead");

                    if (isLiveAction && isSupOrLead) {
                        supervisorAndLeadAssets.push(item.image);
                    } else if (role.includes("atd") || role.includes("td")) {
                        atdAssets.push(item.image);
                    } else {
                        generalAssets.push(item.image);
                    }
                });
            });

            // Fisher-Yates array shuffler helper
            const shuffle = (array) => {
                const arr = [...array];
                for (let i = arr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
                return arr;
            };

            // Helper to safely extract exactly 4 items (wrapping around if catalog is smaller)
            const getFourItems = (arr) => {
                if (!arr || !arr.length) return [];
                const res = [];
                for (let i = 0; i < 4; i++) {
                    res.push(arr[i % arr.length]);
                }
                return res;
            };

            // 1. Track 3 (Live-Action Supervisor & Lead Track)
            const shuffledSupLead = shuffle(supervisorAndLeadAssets);
            const track3Subset = getFourItems(shuffledSupLead);

            // 2. Track 2 (Lighting ATD Track)
            const shuffledAtd = shuffle(atdAssets);
            const track2Subset = getFourItems(shuffledAtd);

            // 3. Track 1 & 4 (Remaining combined pool ensuring zero screen-level duplicates)
            const remainingPool = shuffle([
                ...shuffledSupLead.slice(4),
                ...shuffledAtd.slice(4),
                ...generalAssets
            ]);
            const track1Subset = remainingPool.slice(0, 4);
            const track4Subset = remainingPool.slice(4, 8);

            const trackSubsets = {
                1: track1Subset,
                2: track2Subset,
                3: track3Subset,
                4: track4Subset
            };

            // Populate tracks and inject loop duplicates
            for (let t = 1; t <= 4; t++) {
                const track = document.getElementById(`hero-track-${t}`);
                if (!track) continue;
                const subset = trackSubsets[t];
                if (!subset || !subset.length) continue;
                
                const renderImages = (lazy) => subset.map(src => 
                    `<img src="${src}" class="w-full aspect-[2/3] object-cover rounded-lg shadow-2xl filter grayscale brightness-75" ${lazy ? 'loading="lazy"' : ''} alt="" />`
                ).join('');

                track.innerHTML = renderImages(false) + renderImages(true);
            }
        })
        .catch(err => console.error("Error loading project posters dynamically:", err));
});
