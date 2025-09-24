export const SLIDE_CONFIG = {
  width: 1280,
  height: 720,
  columns: 24,
  rows: 24,
};

export const DEFAULT_POSITIONS: Record<
  string,
  { x: number; y: number; width: number; height: number }
> = {
  heading: { x: 400, y: 100, width: 400, height: 80 },
  paragraph: { x: 100, y: 200, width: 600, height: 200 },
  featureCard: { x: 100, y: 300, width: 300, height: 250 },
};
