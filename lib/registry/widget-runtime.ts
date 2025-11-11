export const WidgetRuntime = {
  heading: () =>
    import("@/components/widgets/headings").then((m) => m.HeadingWidget),
  paragraph: () =>
    import("@/components/widgets/paragraph").then((m) => m.ParagraphWidget),
  featureCard: () =>
    import("@/components/widgets/cards/features").then(
      (m) => m.FeatureCardWidget
    ),
  basicCard: () =>
    import("@/components/widgets/cards/basic").then((m) => m.BasicCard),
  quoteCard: () =>
    import("@/components/widgets/cards/quotes").then((m) => m.QuoteCard),
  listCard: () =>
    import("@/components/widgets/cards/list").then((m) => m.ListCard),
  barChart: () =>
    import("@/components/widgets/charts/base").then((m) => m.BaseChartRender),
  lineChart: () =>
    import("@/components/widgets/charts/base").then((m) => m.BaseChartRender),
  areaChart: () =>
    import("@/components/widgets/charts/base").then((m) => m.BaseChartRender),
  pieChart: () =>
    import("@/components/widgets/charts/base").then((m) => m.BaseChartRender),
  iconCard: () =>
    import("@/components/widgets/cards/icon").then((m) => m.IconWidget),
  divider: () =>
    import("@/components/widgets/divider").then((m) => m.DividerWidget),
  buttonLink: () =>
    import("@/components/widgets/links/base").then((m) => m.ButtonLinkWidget),
  progressBar: () =>
    import("@/components/widgets/progress-bar").then(
      (m) => m.ProgressBarWidget
    ),
  badge: () => import("@/components/widgets/badge").then((m) => m.BadgeWidget),
  image: () => import("@/components/widgets/image").then((m) => m.ImageWidget),
  statWidget: () =>
    import("@/components/widgets/stat-widget").then((m) => m.StatWidget),
};
