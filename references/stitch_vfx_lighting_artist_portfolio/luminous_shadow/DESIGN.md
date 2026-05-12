---
name: Luminous Shadow
colors:
  surface: '#0d1515'
  surface-dim: '#0d1515'
  surface-bright: '#333b3b'
  surface-container-lowest: '#080f10'
  surface-container-low: '#151d1e'
  surface-container: '#192122'
  surface-container-high: '#232b2c'
  surface-container-highest: '#2e3637'
  on-surface: '#dce4e4'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dce4e4'
  inverse-on-surface: '#2a3232'
  outline: '#849495'
  outline-variant: '#3a494b'
  surface-tint: '#00dbe7'
  primary: '#e1fdff'
  on-primary: '#00363a'
  primary-container: '#00f2ff'
  on-primary-container: '#006a71'
  inverse-primary: '#00696f'
  secondary: '#ffb95a'
  on-secondary: '#462a00'
  secondary-container: '#c68315'
  on-secondary-container: '#3d2400'
  tertiary: '#fff6e4'
  on-tertiary: '#3b2f00'
  tertiary-container: '#fed83a'
  on-tertiary-container: '#725e00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#74f5ff'
  primary-fixed-dim: '#00dbe7'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#ffddb6'
  secondary-fixed-dim: '#ffb95a'
  on-secondary-fixed: '#2a1800'
  on-secondary-fixed-variant: '#643f00'
  tertiary-fixed: '#ffe173'
  tertiary-fixed-dim: '#e8c423'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#554500'
  background: '#0d1515'
  on-background: '#dce4e4'
  surface-variant: '#2e3637'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  technical-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.1em
  body-main:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '300'
    lineHeight: '1.6'
  vertical-label:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.3em
spacing:
  gallery-gap: 120px
  section-margin: 8vw
  gutter: 32px
  asymmetric-offset: 15%
---

## Brand & Style

This design system is built for the high-end VFX artist, functioning more as a digital gallery than a standard portfolio. The brand personality is enigmatic and authoritative, mirroring the technical precision and creative soul of visual effects. 

The visual style merges **Minimalism** with a highly refined **Glassmorphism**. It utilizes extreme contrast to simulate a dark-room environment where the "light" (content/work) becomes the focal point. Atmospheric depth is achieved through layered translucency and soft-focus "glow" orbs that drift behind the UI, suggesting movement and light-play inherent in cinematic post-production. The overall feel is avant-garde, prioritizing negative space and unconventional layouts to signal a premium, artistic service.

## Colors

The palette is rooted in the "Deepest Obsidian," providing an infinite-depth backdrop that allows VFX showreels to pop. 

- **Primary (Ethereal Cyan):** Used for critical calls-to-action, active states, and technical highlights. It represents the "digital light" of the VFX software interface.
- **Secondary (Cinematic Amber):** A soft, warm contrast used sparingly for decorative accents, subtle warnings, or to indicate "Human" vs "Technical" elements.
- **Neutral/Surface:** Backgrounds are strictly #050505. Surface elements use high-transparency whites to create the glass effect, while text primarily utilizes high-brightness whites and muted greys for secondary information.

## Typography

This design system employs a tension between the classical and the digital. 

**Playfair Display** is used for large-scale editorial headlines, evoking the luxury and high-art nature of prestige cinema. It should be used with tight tracking in display sizes.

**JetBrains Mono** provides the "ultra-modern" technical counterpoint. It is used for all body copy, metadata, and navigational elements. This conveys the precision of the VFX artist's workflow. Vertical text elements (rotated 90 or 270 degrees) should exclusively use JetBrains Mono in uppercase to act as structural markers on the page edges.

## Layout & Spacing

The layout philosophy rejects standard symmetry in favor of an **Asymmetric Fixed Grid**. 

- **The Gallery Feel:** Use generous whitespace (8vw margins) to ensure content is never crowded. 
- **Asymmetry:** Key elements (like titles or featured images) should be offset by the `asymmetric-offset` variable to create a rhythmic, unpredictable flow that leads the eye through the portfolio.
- **Verticality:** Use the vertical text elements to anchor the left or right edges of sections, creating "frames" within the viewport.
- **Mobile Reflow:** On mobile, the asymmetry collapses into a single-column centered layout, but maintains large vertical gaps (80px+) between sections to preserve the atmospheric breathing room.

## Elevation & Depth

Depth is not communicated through shadows, but through **Optical Translucency**.

- **Glassmorphism:** All containers use a `backdrop-filter: blur(20px)` and a background opacity of 3-5%. 
- **The Glow:** Place large, low-opacity radial gradients (#00f2ff and #ffb347) behind the glass layers. These should feel like "bokeh" or soft-focus studio lights.
- **Borders:** Instead of heavy strokes, use a 1px "Ghost Border"—a linear gradient border from top-left (white, 20% opacity) to bottom-right (white, 0% opacity) to simulate light catching the edge of a glass pane.

## Shapes

The shape language is strictly **Sharp (0px)**. 

To maintain the avant-garde, high-fashion aesthetic, every element—from buttons to image containers—must have perfectly crisp, 90-degree corners. This sharpness contrasts against the "soft" background blurs, emphasizing the technical precision of the VFX work. Decorative elements may include thin, infinite-length vertical lines (hairlines) to divide sections.

## Components

- **Buttons:** Sharp-edged boxes with no fill. Borders are ethereal cyan. On hover, the button fills with a 10% cyan tint and the text glows subtly.
- **Cards:** Use the Glassmorphism specification. Headlines inside cards should be Playfair Display, while metadata (frame rates, software used) should be in JetBrains Mono at the bottom of the card.
- **Vertical Labels:** Labels for "Year," "Category," or "Client" should be rotated 90 degrees and placed on the far left of the component or section.
- **Input Fields:** A single 1px line at the bottom (underline style). Labels sit above in JetBrains Mono (Technical-sm). The cursor/caret should be a solid block, reminiscent of a terminal.
- **Interactive Workreel:** Video thumbnails should have a "soft-focus" filter when inactive, snapping into high-clarity on hover with a cyan border flash.
- **Progress Bars:** Ultra-thin (2px) lines in ethereal cyan, used for loading states or video playback, representing a timeline.