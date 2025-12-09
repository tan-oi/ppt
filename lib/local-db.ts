import Dexie, { Table } from "dexie";
import { Slide } from "@/lib/store/presentation-store";
import {  LocalImage } from "./types";

export interface LocalPresentation {
  id: string;
  title: string
  slides: Slide[];
  theme: string;
  createdAt: Date;
  updatedAt: Date;
  syncedToCloud: boolean; 
}
type PresentationDB = Dexie & {
  presentations: Table<LocalPresentation>;
  images: Table<LocalImage>;
};

let dbInstance: PresentationDB | null = null;

function getDB(): PresentationDB {
  if (dbInstance) return dbInstance;

  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser");
  }

  if (!("indexedDB" in window)) {
    throw new Error("IndexedDB is not supported in this browser");
  }

  try {
    const db = new Dexie("PresentationDB") as PresentationDB;

    db.version(1).stores({
      presentations: "id, title, createdAt, updatedAt, syncedToCloud",
    });

    db.version(2).stores({
      presentations: "id, title, createdAt, updatedAt, syncedToCloud",
      images: "id, presentationId, slideId, widgetId, createdAt",
    });

    dbInstance = db;
    return db;
  } catch (error) {
    console.error("Failed to initialize IndexedDB:", error);
    throw new Error(
      "Failed to access local storage. Please check your browser settings."
    );
  }
}

export async function savePresentationToLocal(presentation: LocalPresentation) {
  const db = getDB();
  await db.presentations.put(presentation);
}

export async function getPresentationFromLocal(
  id: string
): Promise<LocalPresentation | undefined> {
  const db = getDB();
  return await db.presentations.get(id);
}

export async function getAllLocalPresentations(): Promise<LocalPresentation[]> {
  try {
    const db = getDB();
    return await db.presentations.orderBy("updatedAt").reverse().toArray();
  } catch (error) {
    console.error("Error accessing local presentations:", error);
    return [];
  }
}

export async function deletePresentationFromLocal(id: string) {
  const db = getDB();
  const images = await db.images.where("presentationId").equals(id).toArray();
  await Promise.all(images.map((img) => db.images.delete(img.id)));
  await db.presentations.delete(id);
}

export async function updatePresentationInLocal(
  id: string,
  updates: Partial<LocalPresentation>
) {
  const db = getDB();
  await db.presentations.update(id, updates);
}

export async function markPresentationAsSynced(id: string) {
  const db = getDB();
  await db.presentations.update(id, { syncedToCloud: true });
}

export async function saveImageToLocal(image: LocalImage) {
  const db = getDB();
  await db.images.put(image);
}

export async function getImageFromLocal(
  id: string
): Promise<LocalImage | undefined> {
  const db = getDB();
  return await db.images.get(id);
}

export async function getImageByWidget(
  presentationId: string,
  slideId: string,
  widgetId: string
): Promise<LocalImage | undefined> {
  const db = getDB();
  return await db.images
    .where("[presentationId+slideId+widgetId]")
    .equals([presentationId, slideId, widgetId])
    .first();
}

export async function getAllImagesForPresentation(
  presentationId: string
): Promise<LocalImage[]> {
  const db = getDB();
  return await db.images
    .where("presentationId")
    .equals(presentationId)
    .toArray();
}

export async function deleteImageFromLocal(id: string) {
  const db = getDB();
  await db.images.delete(id);
}
