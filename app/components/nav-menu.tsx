"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { CarFrontIcon, DollarSignIcon, HomeIcon, LogOutIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { MenuItem } from "./menu-item";
import { startTransition, useActionState } from "react";
import { logout } from "../auth/actions/logout";
import { redirect } from "next/navigation";

const initialState = { message: "" };
export function NavMenu() {
  const { setTheme, resolvedTheme } = useTheme();
  // @ts-expect-error to be done
  const [_1, action] = useActionState(logout, initialState);

  const handleLogout = () => {
    // @ts-expect-error to be done
    startTransition(() => action({ message: "" }));
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <div className="flex gap-2 items-center">
          <MenuItem href="/" Icon={HomeIcon}>
            Home
          </MenuItem>
          <MenuItem href="/car" Icon={CarFrontIcon}>
            Samochód
          </MenuItem>
          <MenuItem href="/budget" Icon={DollarSignIcon}>
            Budżet
          </MenuItem>
        </div>
        <div className="flex gap-2 items-center">
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
          <MenuItem href="#" Icon={LogOutIcon} handleClick={handleLogout}>
            Wyloguj
          </MenuItem>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
