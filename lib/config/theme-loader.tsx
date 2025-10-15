import { useEffect } from "react";

const THEME_FONTS: Record<string, string[]> = {
  "newspaper-riot": [
    "Oswald:wght@300;400;500;600;700;800;900",
    "Crimson+Text:ital,wght@0,400;0,600;0,700;1,400",
  ],
  "boardroom-blue": ["Inter:wght@300;400;500;600;700;800;900"],
  "executive-charcoal": [
    "Orbitron:wght@400;500;600;700;800;900",
    "Inter:wght@300;400;500;600;700;800;900",
  ],
  "hollywood-glamour": [
    "Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400",
    "Inter:wght@300;400;500;600;700;800;900",
  ],
  "aurora-tech": [
    "Outfit:wght@300;400;500;600;700;800;900",
    "Space+Mono:wght@400;700",
  ],
  "terminal-neon": [
    "IBM+Plex+Mono:wght@300;400;500;600;700",
    "Inter:wght@300;400;500;600;700;800;900",
  ],
  "neon-grid": [
    "Orbitron:wght@400;500;600;700;800;900",
    "Inter:wght@300;400;500;600;700;800;900",
  ],

  "whitespace-pro": ["Manrope:wght@300;400;500;600;700;800"],
  "gourmet-fire": [
    "Cormorant:ital,wght@0,400;0,500;0,600;0,700;1,400",
    "Open+Sans:wght@300;400;500;600;700;800",
  ],
  "fresh-harvest": ["Satisfy", "Lato:wght@300;400;700;900"],
  "champion-energy": ["Russo+One", "Source+Sans+Pro:wght@300;400;600;700;900"],
  "midnight-athlete": [
    "Rajdhani:wght@300;400;500;600;700",
    "Roboto:wght@300;400;500;700;900",
  ],
  "editorial-vogue": [
    "Bodoni+Moda:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400",
    "Work+Sans:wght@300;400;500;600;700;800;900",
  ],
  "pop-art-citrus": [
    "Fredoka:wght@300;400;500;600;700",
    "Nunito:wght@300;400;500;600;700;800;900",
  ],
  "experimental-grid": [
    "Space+Grotesk:wght@300;400;500;600;700",
    "JetBrains+Mono:wght@300;400;500;600;700;800",
  ],
  "scholarly-sage": [
    "Source+Serif+4:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400",
    "Source+Sans+3:wght@300;400;500;600;700;800;900",
  ],
  "bubblegum-play": [
    "Baloo+2:wght@400;500;600;700;800",
    "Quicksand:wght@300;400;500;600;700",
  ],
  kanso: [
    "Noto+Serif+JP:wght@400;500;600;700;900",
    "Noto+Sans+JP:wght@300;400;500;700;900",
  ],
  "brutal-blackline": [
    "Archivo:wght@300;400;500;600;700;800;900",
    "Roboto+Mono:wght@300;400;500;600;700",
  ],
  "velvet-night": [
    "Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400",
    "Plus+Jakarta+Sans:wght@300;400;500;600;700;800",
  ],
  "noir-film": [
    "Oswald:wght@300;400;500;600;700",
    "IBM+Plex+Sans:wght@300;400;500;600;700",
  ],
  "medtech-clean": [
    "Nunito+Sans:wght@300;400;600;700;800;900",
    "Source+Serif+4:ital,wght@0,400;0,500;0,600;0,700;1,400",
  ],
  "wellness-sage": [
    "Lora:ital,wght@0,400;0,500;0,600;0,700;1,400",
    "Inter:wght@300;400;500;600;700;800;900",
  ],
  "wall-street-gold": [
    "Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400",
    "IBM+Plex+Sans:wght@300;400;500;600;700",
  ],
  "crypto-midnight": [
    "Inter:wght@300;400;500;600;700;800;900",
    "JetBrains+Mono:wght@300;400;500;600;700;800",
  ],
  "neon-nights": [
    "Orbitron:wght@400;500;600;700;800;900",
    "Poppins:wght@300;400;500;600;700;800;900",
  ],
};

const loadedFonts = new Set<string>();

export function useThemeFonts(themeName?: string) {
  useEffect(() => {
    if (!themeName || themeName === "starter" || !THEME_FONTS[themeName]) {
      return;
    }

    const fonts = THEME_FONTS[themeName];

    const linkId = `theme-font-${themeName}`;
    if (document.getElementById(linkId)) {
      fonts.forEach((font) => loadedFonts.add(font));
      return;
    }

    const fontsToLoad = fonts.filter((font) => !loadedFonts.has(font));
    const fontUrl = `https://fonts.googleapis.com/css2?${fonts
      .map((font) => `family=${font}`)
      .join("&")}&display=swap`;

    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = fontUrl;

    link.onload = () => {
      fonts.forEach((font) => loadedFonts.add(font));
    };

    document.head.appendChild(link);
  }, [themeName]);
}

export function preloadThemeFonts(themeNames: string[]) {
  const allFonts = new Set<string>();

  themeNames.forEach((themeName) => {
    const fonts = THEME_FONTS[themeName];
    if (fonts) {
      fonts.forEach((font) => allFonts.add(font));
    }
  });

  const fontsToLoad = Array.from(allFonts).filter(
    (font) => !loadedFonts.has(font)
  );

  if (fontsToLoad.length === 0) return;

  const fontUrl = `https://fonts.googleapis.com/css2?${fontsToLoad
    .map((font) => `family=${font}`)
    .join("&")}&display=swap`;

  const linkId = "preloaded-theme-fonts";
  if (document.getElementById(linkId)) return;

  const link = document.createElement("link");
  link.id = linkId;
  link.rel = "stylesheet";
  link.href = fontUrl;

  link.onload = () => {
    fontsToLoad.forEach((font) => loadedFonts.add(font));
  };

  document.head.appendChild(link);
}

export function getAvailableThemes() {
  return Object.keys(THEME_FONTS);
}

export function isThemeFontLoaded(themeName: string): boolean {
  const fonts = THEME_FONTS[themeName];
  if (!fonts) return false;

  return fonts.every((font) => loadedFonts.has(font));
}
