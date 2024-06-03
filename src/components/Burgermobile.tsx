// components/Burgermobile.tsx

"use client";
import { SignIn, useAuth, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

export function Burgermobile() {
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  return (
    <Sheet>
      <SheetTrigger className="focus:outline-none">
        <Menu className="mt-1 h-6 w-6 text-black dark:text-white transition-colors duration-300" />
      </SheetTrigger>
      <SheetContent side="left" className="p-5">
        {isSignedIn ? (
          <>
            <SheetHeader>
              <SheetTitle>Opciones del Usuario</SheetTitle>
              <SheetDescription>
                Hola, {user?.firstName}! Gestiona tu perfil y recetas
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-4">
              <Button onClick={() => signOut()} className="bg-blue-500 text-white hover:bg-blue-600">
                Cerrar sesión
              </Button>
              <Button className="bg-green-500 text-white hover:bg-green-600">
                Mis recetas
              </Button>
            </div>
          </>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle>Iniciar Sesión</SheetTitle>
              <SheetDescription>
                Haz tu perfil con nosotros!
              </SheetDescription>
            </SheetHeader>
            <div className="flex justify-center items-center h-full">
              <SignIn
                appearance={{
                  elements: {
                    rootBox: 'flex w-full bg-gray-100 p-3 rounded-lg shadow-md',
                    formButtonPrimary: 'bg-blue-500 text-white hover:bg-blue-600',
                  },
                }}
              />
            </div>
          </>
        )}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">Cerrar</Button>
          </SheetClose>
        </SheetFooter>
        <ModeToggle />
      </SheetContent>
    </Sheet>
  );
}
