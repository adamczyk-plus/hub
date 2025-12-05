"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { CarFrontIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMenu() {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  console.debug(pathname);

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex justify-between w-screen p-2">
        <div className="flex gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="car" className="flex items-center gap-2 flex-row">
                <CarFrontIcon />
                <span>Samochód</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>
        <div>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="cursor-pointer"
              onClick={() => {
                const newTheme = resolvedTheme === "light" ? "dark" : "light";
                setTheme(newTheme);
              }}
            >
              <SunIcon className="block dark:hidden" />
              <MoonIcon className="hidden dark:block" />
            </NavigationMenuLink>
          </NavigationMenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
