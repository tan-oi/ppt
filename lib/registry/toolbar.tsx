import { BadgeToolbar } from "@/components/widgets/toolbars/badge-toolbar";
import { BasicToolbar } from "@/components/widgets/toolbars/basic-toolbar";
import { DividerToolbar } from "@/components/widgets/toolbars/divider-toolbar";
import { IconToolbar } from "@/components/widgets/toolbars/icon-toolbar";
import { LinkToolbar } from "@/components/widgets/toolbars/link-toolbar";
import { ProgressToolbar } from "@/components/widgets/toolbars/progress-toolbar";

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
    component: BasicToolbar,
  },
  quote: {
    component: BasicToolbar,
  },
  stat: {
    component: BasicToolbar,
  },

  // "chart" :{
  //     component : C
  // }
};
