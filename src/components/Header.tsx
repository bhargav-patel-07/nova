import React from 'react';

export default function Header() {
  return (
    <header className="w-full flex justify-center pt-2">
        {/* Logo */}
       
        {/* Auth Buttons */}
        <div className="flex flex-row items-center gap-2 w-auto justify-end ml-auto sm:hidden">
          <Button className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm">LOGIN</Button>
          <Button className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm">Sign Up</Button>
        </div>
      
    </header>
  );
}
