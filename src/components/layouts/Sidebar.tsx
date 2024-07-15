"use client"

import { useState } from "react";
import {
  HomeIcon,
  PlusIcon,
  ClipboardIcon,
  GearIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const AdminSidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    {
      name: "Home",
      icon: <HomeIcon className="h-6 w-6" />,
      href: "/admin",
    },
    {
      name: "Add Product",
      icon: <PlusIcon className="h-6 w-6" />,
      href: "/admin/add-product",
    },
    {
      name: "Product List",
      icon: <ClipboardIcon className="h-6 w-6" />,
      href: "/admin/product-list",
    },
    {
      name: "Orders",
      icon: <GearIcon className="h-6 w-6" />,
      href: "/admin/orders",
    },
    { name: "Logout", icon: <ExitIcon className="h-6 w-6" />, href: "/api/auth/signout" },
  ];

  return (
    <div className="w-64 h-screen bg-primary text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </div>
      <nav className="mt-10">
        {menuItems.map((item, index) => (
          <Link href={item.href} key={index}
              onClick={() => setActiveMenu(item.name)}
              className={`flex items-center p-4 w-full text-left hover:bg-gray-700 transition-colors ${
                activeMenu === item.name ? "bg-gray-700" : ""
              }`}
            >
              {item.icon}
              <span className="ml-4">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
