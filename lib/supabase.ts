import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function saveImageToSupabase(file: File): Promise<string | null> {
  const fileName = `${Date.now()}_${file.name}`;
  
  const { data, error } = await supabase
    .storage
    .from('udemy_next_blog_bucket')
    .upload(fileName, file, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false
    });
    
  if (error) {
    console.error('Error uploading image to Supabase:', error);
    return null;
  }
  
  const { data: publicUrlData } = supabase
    .storage
    .from('udemy_next_blog_bucket')
    .getPublicUrl(fileName);
    
  return publicUrlData.publicUrl;
}
