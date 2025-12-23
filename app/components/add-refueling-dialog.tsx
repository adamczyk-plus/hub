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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export default function AddRefuelingDialog() {
  const formSchema = z.object({
    odometer: z.string().refine((v) => {
      const value = Number(v);
      return Number.isInteger(value) && value > 320_000 && value < 400_000;
    }),
    pricePerLiter: z.transform(Number).pipe(z.number().min(4).max(8)),
    liters: z.string().min(1),
    date: z.string(),
    notes: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      odometer: "",
      pricePerLiter: 5,
      liters: "",
      date: format(new Date(), "yyyy-MM-dd"),
      notes: "",
    },
  });

  async function onSubmit({
    odometer,
    date,
    liters,
    notes,
    pricePerLiter,
  }: z.infer<typeof formSchema>) {
    const values = {
      odometer: +odometer,
      date,
      liters: Number(liters),
      notes,
      pricePerLiter: Number(pricePerLiter),
    };

    const data = await fetch("/api/refuelings", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const response = await data.json();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Dodaj tankowanie</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tankowanie</DialogTitle>
          <DialogDescription>Dodaj nowe</DialogDescription>
        </DialogHeader>
        {/* <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="odometer">Przebieg</Label>
              <Input name="odometer" placeholder="320 100" type="number" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="pricePerLiter">Cena za litr</Label>
              <Input name="pricePerLiter" type="number" placeholder="5,72 zł" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="liters">Ilość</Label>
              <Input name="liters" type="number" placeholder="45,32 l" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="date">Data</Label>
              <Input
                name="date"
                type="datetime-local"
                defaultValue={format(new Date(), "yyyy-MM-dd HH:mm")}
              />
            </div>
            <div className="grid gap-3 col-span-2">
              <Label htmlFor="notes">Notatki</Label>
              <Textarea name="notes" />
            </div>
          </div> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="odometer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stan licznika</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="217392" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pricePerLiter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cena za litr</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="liters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ilość</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notatki</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Zatwierdź</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
