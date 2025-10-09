export const SLIDE_CONFIG = {
  width: 1280,
  height: 720,
  columns: 24,
  rows: 24,
};

export const commonIcons = [
  { label: "Money", icon: "DollarSign" },
  { label: "Growth", icon: "TrendingUp" },
  { label: "Decline", icon: "TrendingDown" },
  { label: "Bar Chart", icon: "BarChart3" },
  { label: "Pie Chart", icon: "PieChart" },
  { label: "Line Chart", icon: "LineChart" },
  { label: "Global", icon: "Globe" },
  { label: "Location", icon: "MapPin" },
  { label: "Building", icon: "Building" },
  { label: "Business", icon: "Briefcase" },
  { label: "Goal", icon: "Target" },
  { label: "Calendar", icon: "Calendar" },
  { label: "Time", icon: "Clock" },
  { label: "Team", icon: "Users" },
  { label: "Achievement", icon: "Award" },
  { label: "Idea", icon: "Lightbulb" },
  { label: "Success", icon: "CheckCircle" },
  { label: "Error", icon: "XCircle" },
  { label: "Favorite", icon: "Star" },
  { label: "Love", icon: "Heart" },
];

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
  listCard: {
    x: 400,
    y: 200,
    width: 300,
    height: 400,
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
