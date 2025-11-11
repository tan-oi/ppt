import { WidgetRuntime } from "../registry/widget-runtime";



type WidgetKey = keyof typeof WidgetRuntime;

export async function loadWidgetComponent(widgetType: string) {
  const loader = WidgetRuntime[widgetType as WidgetKey];
  if (!loader) {
    throw new Error(`Unknown widget type: ${widgetType}`);
  }

  const module = await loader();
  return module; 
}
