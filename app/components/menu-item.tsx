import {
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ForwardRefExoticComponent, RefAttributes } from "react";

type Props = {
  children: React.ReactNode;
  href: string;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  handleClick?: () => void;
};

export function MenuItem({ children, href, Icon, handleClick }: Props) {
  const isActive = usePathname() === href;

  return (
    <NavigationMenuItem className={`${isActive && "bg-accent rounded-md"}`}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="flex items-center gap-2 flex-row"
          onClick={handleClick}
        >
          {Icon && <Icon />}
          <span>{children}</span>
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
