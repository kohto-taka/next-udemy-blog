'use server';

import { postSchema } from "@/validations/post";
import {saveImage} from "@/utils/image";
import {prisma} from '@/lib/prisma';
import {redirect} from 'next/navigation';
import * as z from "zod";

type ActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
}

export async function updatePost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState>
{
  //フォームから渡ってきた情報を取得
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const topImageInput = formData.get('topImage');
  const topImage = topImageInput instanceof File ? topImageInput : null;
  const postId = formData.get('postId') as string;
  const published = formData.get('published') === 'true';
  const oldImageUrl = formData.get('oldTopImage') as string;

  //バリデーション
  const validationResult = postSchema.safeParse({ title, content, topImage });

  if(!validationResult.success){
    const errors = z.flattenError(validationResult.error);
    return {
      success: false,
      errors: errors.fieldErrors
    }
  }

  //画像の保存
  let imageUrl = oldImageUrl
  if(topImage instanceof File && topImage.size >0 && topImage.name !== 'undefined') {
    const newImageUrl = await saveImage(topImage)
    if(!newImageUrl) {
      return {
        success: false,
        errors: {
          topImage: ['画像の保存に失敗しました']
        }
      }
    }
    imageUrl = newImageUrl;
  }

  //DBに保存
  await prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      topImage: imageUrl,
      published
    }
  })
  redirect('/dashboard');
}
