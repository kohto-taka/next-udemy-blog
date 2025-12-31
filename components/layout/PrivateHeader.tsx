import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import Setting from "./Setting";
import { auth } from '@/auth';

export default async function PrivateHeader() {
  const session = await auth();
  if(!session?.user?.email) throw new Error('不正なリクエストです');
  return (
    <header className="border-b bg-blue-200">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard" className="font-block text-xl">
                  管理者ページ
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} />
      </div>
    </header>
  )
}
