"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SearchBox from "@/components/post/SearchBox"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export default function PublicHeader() {
  return (
    <div>
      <header className="border-b bg-blue-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="font-block text-xl">
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex gap-4 items-center">
            <SearchBox />
            <Button variant="outline" asChild>
              <Link href="/login">
                ログイン
              </Link>
            </Button>
            <Button asChild>
              <Link href="/register">
                新規登録
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}
