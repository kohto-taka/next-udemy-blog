import { writeFile } from "fs/promises";
import path from "path";
import { saveImageToSupabase } from "@/lib/supabase";

export async function saveImage(file: File): Promise<string | null>{
  const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === "true";
  if(useSupabase) {
    return await saveImageToSupabase(file);
  }else {
    return await saveImageToLocal(file);
  }
}

export async function saveImageToLocal(file: File): Promise<string | null>{
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}_${file.name}`;
  const uploadDir = path.join(process.cwd(), 'public/images');

  try {
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    return `/images/${fileName}`;
  } catch (error) {
    console.error('Error saving image:', error);
    return null;
  }
}
