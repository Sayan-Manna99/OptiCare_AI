"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import NavItems from "./NavItems";



type User = {
  id: string;
  name: string;
  email: string;
};
const user: User = {
  id: "123",
  name: "John Doe",
  email: "john.doe@example.com"
};

function UserDropdown() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // ✅ Added loading state

  const handleSignOut = async () => {
   try {
    setIsLoading(true);
    router.push("/sign-in");
   } catch (error) {
    console.error("Sign out failed:", error);
   }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 text-gray-400 hover:text-blue-400 hover:bg-gray-800"
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">
              {user.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-gray-200">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 bg-gray-800 border-gray-700"
      >
        {/* User Info */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">
                {user.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-200">
                {user.name}
              </span>
              <span className="text-xs text-gray-400">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        {/* Mobile Nav - Show on small screens */}
        <div className="sm:hidden">
          <DropdownMenuSeparator className="bg-gray-700" />
          <nav className="text-gray-300">
            <NavItems />
          </nav>
        </div>

        {/* Desktop Separator */}
        <DropdownMenuSeparator className="hidden sm:block bg-gray-700" />

        {/* Logout Button */}
        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={isLoading} // ✅ Disable while loading
          className="text-gray-200 hover:text-red-400 hover:bg-gray-700 focus:bg-gray-700 focus:text-red-400 cursor-pointer" // ✅ Fixed colors
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4 mr-2" /> // ✅ Icon beside text, always visible
          )}
          {isLoading ? "Signing out..." : "Sign Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
