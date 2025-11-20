import { BadgeToolbar } from "@/components/widgets/toolbars/badge-toolbar";
import { BasicToolbar } from "@/components/widgets/toolbars/basic-toolbar";
import { ChartToolbar } from "@/components/widgets/toolbars/chart-toolbar";
import { DividerToolbar } from "@/components/widgets/toolbars/divider-toolbar";
import { IconToolbar } from "@/components/widgets/toolbars/icon-toolbar";
import { ImageToolbar } from "@/components/widgets/toolbars/image-toolbar";
import { LinkToolbar } from "@/components/widgets/toolbars/link-toolbar";
import { ListToolbar } from "@/components/widgets/toolbars/list-toolbar";
import { ProgressToolbar } from "@/components/widgets/toolbars/progress-toolbar";
import { StatToolbar } from "@/components/widgets/toolbars/stats-toolbar";

export const ToolbarRegistry = {
  badge: {
    component: BadgeToolbar,
  },
  link: {
    component: LinkToolbar,
  },
  divider: {
    component: DividerToolbar,
  },
  icon: {
    component: IconToolbar,
  },
  progress: {
    component: ProgressToolbar,
  },
  text: {
    component: BasicToolbar,
  },
  feature: {
    component: BasicToolbar,
  },
  list: {
    component: ListToolbar,
  },
  quote: {
    component: BasicToolbar,
  },
  stat: {
    component: StatToolbar,
  },
  chart: {
    component: ChartToolbar,
  },
  image: {
    component: ImageToolbar,
  },
  basic: {
    component: BasicToolbar,
  },
};
