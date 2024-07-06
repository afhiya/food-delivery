import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AuthLayoutsProps {
  title: string;
  children: ReactNode;
}

const AuthLayouts: React.FC<AuthLayoutsProps> = ({ children, title }) => {
  return (
    <div className="flex justify-center items-center h-svh">
      <div className="flex sm:w-96 w-80 flex-col border-2 border-primary px-10 py-5">
        <div className="text-primary mb-2">
          <h1 className="font-bold text-3xl">{title}</h1>
          <p className="text-sm font-semibold">
            Welcome, Please enter your details
          </p>
        </div>
        {children}
        <Button size="sm" variant="default" className="mt-3">
          {title}
        </Button>
      </div>
    </div>
  );
};

export default AuthLayouts;
