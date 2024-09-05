"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useAppSelector } from "@/hooks";
import Cart from "./Cart";

const Navbar = () => {
  const { data } = useSession();
  const pathname = usePathname();
  
  const navlink: Array<{
    title: string
    link: string
  }> = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Menu",
      link: "/menu",
    },
    {
      title: "Testimonial",
      link: "/testimonial",
    },
  ];
  
  const disabled = ["auth", "admin", "checkout"];

  const hideNavbar = disabled.includes(pathname.split("/")[1]);

  if (hideNavbar) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-24 py-7 w-full h-20 bg-secondary border-b-2 border-primary sticky top-0 z-50">
      <div className="flex flex-col items-center cursor-default">
        <h1 className="text-xl font-bold text-muted">Zutto</h1>
        <h3 className="text-sm text-muted">Food</h3>
      </div>
      <div className="flex gap-12 text-sm text-muted items-center font-bold">
        {navlink.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.link}
              className={`px-4 py-2 hover:text-secondary hover:bg-primary transition-all rounded-md ${
                pathname == link.link && "text-secondary bg-primary"
              }`}
              onClick={() => window.scrollTo(0, 0)}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-5 items-center">
        <Cart />
        {data ? 
          <Button
            className="px-7 py-3 bg-muted text-center font-bold text-secondary text-xs rounded-full"
            type="button"
            onClick={() => signOut()}
          >
            Log Out
          </Button>
         : 
          <Link
            className="px-7 py-3 bg-muted text-center font-bold text-secondary text-xs rounded-full"
            href="/auth/register"
          >
            Join to Community
          </Link>
        }
      </div>
    </div>
  );
};

export default Navbar;
