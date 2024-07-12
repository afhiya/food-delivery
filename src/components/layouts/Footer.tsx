"use client";

import { usePathname } from "next/navigation";
import { InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  const pathname = usePathname();
  const disabled = ["auth", "admin"];
  const hideFooter = disabled.includes(pathname.split("/")[1]);

  if (hideFooter) return null;

  return (
    <footer className="bg-secondary text-center text-sm mt-5 border-t-2 border-primary py-4">
      <div className="container mx-auto">
        <div className="flex justify-center mb-4">
          <a
            href="https://www.facebook.com"
            className="mx-2 text-primary hover:text-muted transition-all"
          >
            <LinkedInLogoIcon />
          </a>
          <a
            href="https://www.twitter.com"
            className="mx-2 text-primary hover:text-muted transition-all"
          >
            <TwitterLogoIcon />
          </a>
          <a
            href="https://www.instagram.com"
            className="mx-2 text-primary hover:text-muted transition-all"
          >
            <InstagramLogoIcon />
          </a>
        </div>
        <div className="text-primary mb-2">
          <h1 className="font-bold">Copyright By Zutto</h1>
        </div>
        <div className="text-primary">
          <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
