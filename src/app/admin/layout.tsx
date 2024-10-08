import AdminSidebar from "@/components/layouts/Sidebar";
import ToastProvider from "@/context/Provider/toast";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Food Delivery",
  description: "Generated by Zutto",
  applicationName: "Zutto Food",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`${poppins.className} flex`}>
      <AdminSidebar />
      <ToastProvider>{children}</ToastProvider>
    </section>
  );
}
