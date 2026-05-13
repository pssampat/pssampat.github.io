# Pratik Sampat — VFX & 3D Lighting Portfolio

A professional, high-end portfolio website showcasing the work of **Pratik Sampat**, a Lighting Lead / Supervisor and Senior VFX Lighting & Compositing Artist. 

Designed with a sleek, dark-themed "Luminous Shadow" aesthetic, this site highlights professional contributions to major feature films, streaming episodics, and animated features, alongside highly detailed personal 3D artwork.

## 🚀 Technologies & Design System

- **Core**: HTML5, Vanilla JavaScript
- **Styling**: Tailwind CSS (CDN with custom configuration) + Vanilla CSS utilities (`css/style.css`)
- **Typography**: Google Fonts — **Playfair Display** (Headlines) & **JetBrains Mono** (Technical Details & Body)
- **Iconography**: Material Symbols Outlined
- **Data Architecture**: Fully dynamic rendering powered by external JSON data stores

## 📂 Project Structure

- `index.html`: The cinematic home landing page introducing the premium visual identity.
- `projects.html`: The primary works showcase featuring a responsive grid layout. Renders categories dynamically using custom JavaScript filters.
- `info.html`: Detailed professional dossier featuring an elegant two-column editorial layout, work experience timeline, technical skills breakdown (with glowing progress bars), and academic background. Includes a direct CV download.
- `contact.html`: Clean, focused interface for professional inquiries and collaboration requests.
- `assets/`:
  - `projects.json`: Metadata, roles, descriptions, and trailer links for professional VFX Feature Films, Episodics, and Animation works.
  - `personal_works.json`: Dynamic metadata store for personal 3D artwork.
  - `images/`: High-resolution optimized posters, stills, and application branding assets.
- `js/`:
  - `projects.js`: Core data-fetching logic, category filtering, responsive card construction, and interactive lightbox controls.

## ✨ Key Features

- **Cinematic Aesthetic**: Immersive dark mode design featuring rich cyan accents, custom asymmetric margins, and ambient glow effects.
- **Dynamic Content Delivery**: Professional and personal works are fetched asynchronously from clean JSON data files, decoupling content updates from core markup.
- **Editorial Resume**: A beautifully structured, fully responsive CSS Grid layout showcasing career milestones, exact proficiency levels, and direct document downloads.
- **Advanced Lightbox Experience**: Clicking any personal work opens a fullscreen high-fidelity image overlay complete with:
  - **Pan & Zoom**: Mouse wheel scroll/two-finger pinch to scale smoothly (0.5x to 5x), and click-and-drag/swipe to pan around high-resolution renders.
  - **Robust Controls**: Highly visible contextual controls optimized for bright or dark imagery.
- **Responsive Navigation**: Unified desktop headers and sleek mobile overlay menus delivering a seamless cross-device workflow.

## 🛠️ Local Setup

Since this is a client-side web application, running it locally is extremely simple:

1. Clone the repository:
   ```bash
   git clone https://github.com/pssampat/pssampat.github.io.git
   ```
2. Open the project folder using any modern IDE or code editor.
3. Launch a local web server (e.g., via the **Live Server** extension in VS Code, or running `npx serve .` / `python -m http.server`) to ensure asynchronous JSON `fetch()` requests resolve correctly.