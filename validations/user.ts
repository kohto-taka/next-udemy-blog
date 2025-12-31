import { z } from "zod";

export const regiterSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.email("メールアドレスは必須です。正しいメールアドレスを入力してください。"),
  password: z.string({error: "パスワードは必須です。"})
    .min(1, "パスワードを入力してください")
    .min(8, "パスワードは8文字以上で入力してください")
    .max(32, "パスワードは32文字以下で入力してください"),
  confirmPassword: z.string({error: "確認用パスワードは必須です。"})
    .min(1, "確認用パスワードを入力してください"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードと確認用パスワードが一致しません。",
  path: ["confirmPassword"],
});
