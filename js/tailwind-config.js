// Shared Tailwind CSS Configuration
// Reusable across all pages in the portfolio to ensure a single source of truth for the Luminous Shadow design tokens.

tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary-container": "#00f2ff",
                "background": "#0d1515",
                "on-background": "#dce4e4",
                "surface": "#0d1515",
                "on-surface": "#dce4e4",
                "surface-variant": "#2e3637",
                "on-surface-variant": "#b9cacb",
                "outline": "#849495",
                "surface-container-lowest": "#080f10",
                "surface-container-low": "#151d1e",
                "primary": "#e1fdff",
                "secondary": "#ffb95a",
            },
            spacing: {
                "gallery-gap": "120px",
                "section-margin": "8vw",
                "asymmetric-offset": "15%",
                "gutter": "32px"
            },
            fontFamily: {
                "headline-md": ["Playfair Display"],
                "vertical-label": ["JetBrains Mono"],
                "display-lg": ["Playfair Display"],
                "headline-md-mobile": ["Playfair Display"],
                "technical-sm": ["JetBrains Mono"],
                "body-main": ["JetBrains Mono"],
                "display-lg-mobile": ["Playfair Display"]
            },
            fontSize: {
                "headline-md": ["40px", { "lineHeight": "1.2", "fontWeight": "400" }],
                "vertical-label": ["10px", { "lineHeight": "1", "letterSpacing": "0.3em", "fontWeight": "500" }],
                "display-lg": ["72px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "headline-md-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "400" }],
                "technical-sm": ["12px", { "lineHeight": "1.5", "letterSpacing": "0.1em", "fontWeight": "400" }],
                "body-main": ["16px", { "lineHeight": "1.6", "fontWeight": "300" }],
                "display-lg-mobile": ["48px", { "lineHeight": "1.1", "fontWeight": "700" }]
            }
        }
    }
};
