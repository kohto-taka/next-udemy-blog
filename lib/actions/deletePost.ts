'use server';

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
}

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export async function deletePost(postId: string): Promise<ActionState> {
  await prisma.post.delete({
    where: { id: postId }
  });
  redirect('/dashboard');
}
