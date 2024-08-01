"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

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

  const disabled = ["auth", "admin"];

  const hideNavbar = disabled.includes(pathname.split("/")[1]);

  if (hideNavbar) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-24 py-7 w-full h-20 bg-secondary border-b-2 border-primary">
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
            >
              {link.title}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-5 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        >
          <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path>
          <circle cx="10.5" cy="19.5" r="1.5"></circle>
          <circle cx="17.5" cy="19.5" r="1.5"></circle>
        </svg>
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
