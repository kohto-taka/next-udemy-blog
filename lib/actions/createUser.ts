'use server';

import { regiterSchema } from "@/validations/user";
import { flattenError, ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";

type ActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
};
function handleValidationError(error: ZodError): ActionState {
  const { fieldErrors, formErrors } = flattenError(error);
  const castedFieldErrors = fieldErrors as Record<string, string[]>;

  if (formErrors.length > 0) {
    return {
      success: false,
      errors: {
        ...(fieldErrors as Record<string, string[]>),
        confirmPassword: [
          ...((fieldErrors as Record<string, string[]>).confirmPassword ?? []),
          ...formErrors
        ]
      }
    };
  }
  return { success: false, errors: castedFieldErrors };
}

function handleError(customErrors: Record<string, string[]>): ActionState {
  return { success: false, errors: customErrors };
}

export async function createUser(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  //フォームから渡ってきた情報を取得
  const rawFromData = Object.fromEntries(
    ['name', 'email', 'password', 'confirmPassword'].map((filed) => [
      filed,
      formData.get(filed) as string
    ])
  ) as Record<string, string>;
  
  //バリデーション
  const validationResult = regiterSchema.safeParse(rawFromData);

  if (!validationResult.success) {
    return handleValidationError(validationResult.error);
  }
  //DBにメールアドレスがあるか確認
  const existingUser = await prisma.user.findUnique({
    where: { email: rawFromData.email }
  });
  if (existingUser) {
    return handleError({ email: ['このメールアドレスは既に使用されています'] });
  }
  // パスワードをハッシュ化
  const hashedPassword = await bcryptjs.hash(rawFromData.password, 12);

  await prisma.user.create({
    data: {
      name: rawFromData.name,
      email: rawFromData.email,
      password: hashedPassword,
    },
  });

  await signIn('credentials', {
    ...Object.fromEntries(formData),
    redirect: false,
  });

  redirect('/dashboard');
}
