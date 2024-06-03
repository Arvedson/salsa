"use client";
import React from 'react';
import { UserButton, useUser } from '@clerk/nextjs';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Burgermobile } from '@/components/Burgermobile';
import { Button } from '@/components/ui/button';
import SignInSheet from '@/components/SignInSheet';
import SignUpSheet from '@/components/SignUpSheet';

function Navbar() {
  const { user } = useUser();

  return (
    <div className="bg-red-800 dark:bg-red-900 p-4 flex items-center justify-between">
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold text-dark-green">
        Haz<span className="font-extrabold text-red-500">Tu</span>salsa
      </p>

      <div className="ml-auto hidden lg:flex" style={{ padding: '0 10px' }}>
        <ModeToggle />
      </div>

      <div className="flex lg:hidden items-center">
        <Button className="mr-4 text-white px-4 py-2 rounded-lg border-none outline-none transition duration-300 ease-in-out hover:bg-red-700">
          Crea tu receta!
        </Button>
        <div className="mr-4">
          <Burgermobile />
        </div>
      </div>

      <div className="hidden lg:flex items-center">
        {user ? (
          <>
            <UserButton afterSignOutUrl="/" />
            <Button className="ml-4 text-white px-4 py-2 rounded-lg border-none outline-none transition duration-300 ease-in-out hover:bg-red-700">
              Mis salsas
            </Button>
          </>
        ) : (
          <>
            <div className="px-4 py-2 rounded-lg border-none outline-none transition duration-300 ease-in-out">
              <SignInSheet />
            </div>
            <SignUpSheet />
          </>
        )}
        <Button className="ml-4 text-white px-4 py-2 rounded-lg border-none outline-none transition duration-300 ease-in-out hover:bg-red-700">
          Crea tu receta!
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
