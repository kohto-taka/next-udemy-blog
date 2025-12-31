'use client';

import { useActionState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createUser } from "@/lib/actions/createUser"


export default function RegisterForm() {
  const [state, formAction] = useActionState(
    createUser,
    {
      success: false,
      errors: {}
    }
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>新規登録</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="name">名前</Label>
            <Input id="name" name="name" type="text" required />
            {
              state.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name.join(',')}</p>
              )
            }
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" name="email" type="email" required />
            {
              state.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email.join(',')}</p>
              )
            }
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          {
            state.errors?.password && (
              <p className="text-sm text-red-500">{state.errors.password.join(',')}</p>
            )
          }
          <div>
            <Label htmlFor="confirmPassword">パスワードの確認</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" required />
            {
              state.errors?.confirmPassword && (
                <p className="text-sm text-red-500">{state.errors.confirmPassword.join(',')}</p>
              )
            }
          </div>
          <Button type="submit" className="w-full">登録</Button>
        </form>
      </CardContent>
    </Card>
  )
}

