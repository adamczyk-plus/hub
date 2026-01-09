"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddFillUpForm } from "./add-fill-up-form";
import { useState } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function AddFillUpDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop();

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Dodaj +</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-100">
          <DialogHeader>
            <DialogTitle>Dodaj</DialogTitle>
            <DialogDescription>Tankowanie</DialogDescription>
          </DialogHeader>
          <AddFillUpForm />
        </DialogContent>
      </Dialog>
    );
  else
    return (
      <Drawer open={open} onOpenChange={setOpen} autoFocus={open}>
        <DrawerTrigger asChild>
          <Button variant={"outline"}>Dodaj +</Button>
        </DrawerTrigger>
        <DrawerContent className="px-2 pb-2">
          <DrawerHeader>
            <DrawerTitle>Dodaj</DrawerTitle>
            <DrawerDescription>Tankowanie</DrawerDescription>
          </DrawerHeader>
          <AddFillUpForm />
        </DrawerContent>
      </Drawer>
    );
}
