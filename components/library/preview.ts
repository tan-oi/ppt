import type { CSSProperties } from "react";

const CURATED_HUES = [210, 230, 290, 310, 330, 350, 10, 30, 170, 190];

export const PREVIEW_GRAIN =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>";

function hashId(id: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function pickHues(h: number) {
  const baseHue = CURATED_HUES[h % CURATED_HUES.length];
  const accentHue = CURATED_HUES[(h >>> 8) % CURATED_HUES.length];
  const drift = ((h >>> 4) % 30) - 15;

  return {
    primary: (baseHue + drift + 360) % 360,
    neighbor: (baseHue + drift + 25) % 360,
    accent: (accentHue + 360) % 360,
    tertiary: (baseHue + drift + 60 + 360) % 360,
  };
}

function pickGeometry(h: number) {
  const conicSide = (h >>> 20) % 4;
  const conicCx =
    conicSide === 0
      ? -30 - ((h >>> 22) % 30)
      : conicSide === 1
        ? 130 + ((h >>> 22) % 30)
        : 20 + ((h >>> 22) % 60);
  const conicCy =
    conicSide === 2
      ? -30 - ((h >>> 24) % 30)
      : conicSide === 3
        ? 130 + ((h >>> 24) % 30)
        : 20 + ((h >>> 24) % 60);

  return {
    startX: 15 + ((h >>> 12) % 25),
    startY: 10 + ((h >>> 14) % 20),
    accentX: 55 + ((h >>> 16) % 35),
    accentY: 50 + ((h >>> 18) % 35),
    conicCx,
    conicCy,
    conicAngle: (h >>> 24) % 360,
    linearAngle: ((h >>> 26) % 18) * 20,
  };
}

const VIGNETTE =
  "linear-gradient(180deg, rgba(10,10,10,0) 60%, rgba(10,10,10,0.45) 100%)";

type Hues = ReturnType<typeof pickHues>;
type Geometry = ReturnType<typeof pickGeometry>;

const LAYER_BUILDERS: Array<(hues: Hues, geo: Geometry) => string[]> = [
  (hues, geo) => {
    const reflectX = 100 - Math.min(Math.max(geo.conicCx, 0), 100);
    const reflectY = 100 - Math.min(Math.max(geo.conicCy, 0), 100);
    return [
      `conic-gradient(from ${geo.conicAngle}deg at ${geo.conicCx}% ${geo.conicCy}%, hsla(${hues.primary},55%,55%,0.7), hsla(${hues.accent},55%,50%,0.6), hsla(${hues.neighbor},55%,55%,0.7), hsla(${hues.tertiary},55%,50%,0.55), hsla(${hues.primary},55%,55%,0.7))`,
      `radial-gradient(80% 60% at ${reflectX}% ${reflectY}%, hsla(${hues.accent},60%,55%,0.45) 0%, transparent 70%)`,
      `linear-gradient(${geo.linearAngle}deg, transparent 0%, hsla(${hues.tertiary},50%,40%,0.2) 100%)`,
    ];
  },
  (hues, geo) => [
    `linear-gradient(${geo.linearAngle}deg, hsla(${hues.primary},55%,50%,0.75) 0%, hsla(${hues.accent},55%,45%,0.55) 50%, hsla(${hues.neighbor},55%,40%,0.65) 100%)`,
    `radial-gradient(60% 80% at ${geo.startX}% ${geo.startY}%, hsla(${hues.tertiary},60%,60%,0.5) 0%, transparent 70%)`,
    `conic-gradient(from ${geo.conicAngle}deg at ${geo.conicCx}% ${geo.conicCy}%, transparent 0%, hsla(${hues.accent},55%,55%,0.3) 50%, transparent 100%)`,
  ],
  (hues, geo) => [
    `linear-gradient(${geo.linearAngle}deg, hsla(${hues.primary},55%,52%,0.7) 0%, transparent 60%)`,
    `linear-gradient(${(geo.linearAngle + 90) % 360}deg, hsla(${hues.accent},55%,52%,0.65) 0%, transparent 65%)`,
    `radial-gradient(80% 60% at ${geo.accentX}% ${geo.accentY}%, hsla(${hues.neighbor},60%,55%,0.55) 0%, transparent 70%)`,
    `conic-gradient(from ${geo.conicAngle}deg at ${geo.conicCx}% ${geo.conicCy}%, transparent 60%, hsla(${hues.tertiary},55%,50%,0.35) 80%, transparent 100%)`,
  ],
  (hues, geo) => [
    `conic-gradient(from ${geo.conicAngle}deg at ${geo.conicCx}% ${geo.conicCy}%, hsla(${hues.primary},60%,55%,0.65), transparent 30%, hsla(${hues.accent},55%,50%,0.7) 60%, transparent 85%, hsla(${hues.primary},60%,55%,0.65))`,
    `radial-gradient(120% 90% at ${geo.startX}% ${geo.startY}%, hsla(${hues.neighbor},55%,55%,0.55) 0%, transparent 70%)`,
    `linear-gradient(${geo.linearAngle}deg, transparent 0%, hsla(${hues.tertiary},50%,40%,0.3) 100%)`,
  ],
];

export function previewBackground(id: string): { style: CSSProperties } {
  const h = hashId(id);
  const hues = pickHues(h);
  const geo = pickGeometry(h);
  const layers = LAYER_BUILDERS[(h >>> 6) % LAYER_BUILDERS.length](hues, geo);
  layers.push(VIGNETTE);
  return { style: { background: layers.join(", ") } };
}
