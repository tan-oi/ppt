import { ListSelector } from "@/components/toolbar/list-selector";

import { BasicToolbar } from "./basic-toolbar";

export function ListToolbar() {
  return (
    <>
      <div className="flex">
        <ListSelector />
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-zinc-600 to-transparent" />

        <BasicToolbar />
      </div>
    </>
  );
}
