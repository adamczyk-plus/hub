"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, startTransition, useActionState, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { login } from "../actions/login";

const initialState: { error?: string } = { error: undefined };

export default function LoginPage() {
  const router = useRouter();
  const [state, action, pending] = useActionState(login, initialState);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(() => action({ username, password }));
  }

  useEffect(() => {
    if (!state.error && !pending) router.push("/");
  }, [state, pending, router]);

  return (
    <div className="flex w-full justify-center h-screen items-center">
      <Card className="w-100 h-fit">
        <CardHeader className="flex">
          <CardTitle>Zaloguj się</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} id="loginForm">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Login</Label>
                <Input
                  name="username"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Hasło</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Przypomnij hasło
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          <Button form="loginForm" type="submit" className="w-full" disabled={pending}>
            Zaloguj
          </Button>
          {state.error && <Label className="text-red-600">{state.error}</Label>}
        </CardFooter>
      </Card>
    </div>
    // <div className="flex justify-center pt-2"></div>

    // {/* <AddRefuelingDialog />
    // <div className="container mx-auto py-10">
    //   <DataTable columns={columns} data={data} />
    // </div> */}
    // {/* <div className="w-screen flex flex-col items-center gap-1">
    //   {!data.length ? (
    //     <p>Loading...</p>
    //   ) : (
    //     data.map((item) => <RefuelCard key={item.id} payload={item} />)
    //   )}
    // </div> */}
  );
}
