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
  heading: { x: 400, y: 100, width: 300, height: 60 },
  paragraph: { x: 100, y: 200, width: 200, height: 60 },
  featureCard: { x: 100, y: 300, width: 300, height: 250 },
  quoteCard: { x: 100, y: 300, width: 300, height: 250 },

  basicCard: {
    x: 400,
    y: 200,
    width: 200,
    height: 200,
  },
  barChart: {
    x: 200,
    y: 400,
    width: 200,
    height: 200,
  },
  lineChart: {
    x: 200,
    y: 400,
    width: 200,
    height: 280,
  },
  pieChart: {
    x: 200,
    y: 400,
    width: 200,
    height: 380,
  },
  areaChart: {
    x: 200,
    y: 400,
    width: 200,
    height: 280,
  },
};
