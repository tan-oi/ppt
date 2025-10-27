import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import * as LucideIcons from "lucide-react";
import * as React from "react";

import { useUIStore } from "@/lib/store/ui-store";
import { BaseDropdown } from "@/components/base/dropdown";
import { commonIcons } from "@/lib/config/slide";
import { BaseColorInput } from "@/components/base/color-changer";

export function IconToolbar() {
  const editBuffer = useUIStore((s) => s.editBuffer);
  console.log(editBuffer);
  const updateEditBuffer = useUIStore((s) => s.updateEditBuffer);
  const [iconSearch, setIconSearch] = React.useState("");

  if (!editBuffer?.widgetData) return null;
  const widgetData = editBuffer.widgetData;

  const handleUpdate = (key: string, value: any) => {
    updateEditBuffer({
      [key]: value,
    });
  };

  const allLucideIcons = React.useMemo(() => {
    const allKeys = Object.keys(LucideIcons);
    console.log("All Lucide keys:", allKeys.length);
    console.log("Sample keys:", allKeys.slice(0, 20));

    const icons = allKeys
      .filter((key) => {
        const isValidKey =
          key !== "default" &&
          key !== "createLucideIcon" &&
          !key.startsWith("Lucide");
        const value = (LucideIcons as any)[key];
        const isComponent =
          typeof value === "object" || typeof value === "function";
        return isValidKey && isComponent;
      })
      .map((iconName) => ({
        label: iconName.replace(/([A-Z])/g, " $1").trim(),
        icon: iconName,
      }));

    console.log("Filtered icons:", icons.length);
    console.log("First 10 icons:", icons.slice(0, 10));

    return icons;
  }, []);

  const filteredIcons = React.useMemo(() => {
    if (!iconSearch) {
      return commonIcons;
    }

    const filteredCommonIcons = commonIcons.filter(
      ({ label, icon }) =>
        label.toLowerCase().includes(iconSearch.toLowerCase()) ||
        icon.toLowerCase().includes(iconSearch.toLowerCase())
    );
    if (filteredCommonIcons.length > 0) {
      return filteredCommonIcons;
    }

    const filteredAll = allLucideIcons.filter(
      ({ label, icon }) =>
        label.toLowerCase().includes(iconSearch.toLowerCase()) ||
        icon.toLowerCase().includes(iconSearch.toLowerCase())
    );

    console.log("Filtered all lucide:", filteredAll.length);
    console.log("Sample:", filteredAll.slice(0, 5));

    return filteredAll;
  }, [iconSearch, allLucideIcons]);

  return (
    <>
      <BaseDropdown
        label="Show label"
        value={String(widgetData.showLabel)}
        options={[
          {
            label: "Show label",
            value: "true",
          },

          {
            label: "Hide label",
            value: "false",
          },
        ]}
        onChange={(newValue) => handleUpdate("showLabel", newValue === "true")}
        tooltip="Toggle label"
      />

      {widgetData.showLabel && (
        <BaseDropdown
          label="Label position"
          value={widgetData.labelPosition}
          options={[
            {
              label: "Bottom",
              value: "bottom",
            },

            {
              label: "Right",
              value: "right",
            },
            {
              label: "Top",
              value: "top",
            },
            {
              label: "Left",
              value: "left",
            },
          ]}
          onChange={(newValue) => handleUpdate("labelPosition", newValue)}
          tooltip="Choose a label position"
        />
      )}

      <BaseDropdown
        label="Icon size"
        value={widgetData.iconSize}
        options={[
          {
            label: "Extra Small",
            value: 14,
          },

          {
            label: "Small",
            value: 18,
          },
          {
            label: "Medium",
            value: 24,
          },
          {
            label: "Large",
            value: 32,
          },
          {
            label: "Extra Large",
            value: 48,
          },
        ]}
        tooltip="Choose icon size"
        showCustomInput
        inputType="number"
        onChange={(newValue) => handleUpdate("iconSize", newValue)}
      />

      {widgetData.showLabel && (
        <Input
          data-toolbar-input
          value={widgetData.label ?? ""}
          type="text"
          placeholder="Enter label text"
          onChange={(e) => handleUpdate("label", e.target.value)}
          className="min-w-[150px] max-w-[300px]"
        />
      )}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} className="text-sm cursor-pointer rounded">
            <LucideIcons.Shapes />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          data-widget
          sideOffset={10}
          className="flex flex-col justify-start border-none p-2 max-w-[250px] space-y-3"
        >
          <div className="space-y-1">
            <Input
              placeholder="Search for the icon"
              className="w-full mt-1"
              data-widget
              value={iconSearch}
              onChange={(e) => setIconSearch(e.target.value)}
            />

            <p className="text-xs text-right text-zinc-700">
              Icons powered by Lucide Icons
            </p>
          </div>

          <div className="grid grid-cols-5 gap-1 max-h-[300px] overflow-y-auto">
            {filteredIcons.length > 0 ? (
              filteredIcons.map(({ label, icon }) => {
                const IconComponent =
                  (LucideIcons as any)[icon] || LucideIcons.HelpCircle;
                return (
                  <button
                    key={icon}
                    onClick={() => handleUpdate("iconName", icon)}
                    className="flex flex-col items-center justify-center cursor-pointer p-2 border-none rounded hover:bg-gray-50/10 hover:text-gray-50/80"
                    title={label}
                  >
                    <IconComponent size={24} />
                  </button>
                );
              })
            ) : (
              <div className="col-span-5 text-center text-sm text-gray-400 py-4">
                No icons found
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <BaseColorInput
        icon={LucideIcons.Paintbrush}
        value={widgetData.iconColor}
        onChange={(newValue) => handleUpdate("iconColor", newValue)}
      />
    </>
  );
}
