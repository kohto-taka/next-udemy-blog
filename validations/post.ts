import { z } from "zod";

export const postSchema = z.object({
  title: z.string()
    .min(1, "タイトルは必須です。")
    .max(255, "タイトルは255文字以下で入力してください。"),
  content: z.string()
    .min(1, "内容は必須です。"),
  topImage: z.instanceof(File).nullable().optional()
});
