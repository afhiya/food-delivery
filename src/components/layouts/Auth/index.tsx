import React, { ReactNode } from "react";

interface AuthLayoutsProps {
  title: string;
  children: ReactNode;
}

const AuthLayouts: React.FC<AuthLayoutsProps> = ({ children, title }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex sm:w-96 w-80 flex-col border-2 border-primary px-10 py-8 relative">
        <div className="text-primary mb-2">
          <h1 className="font-bold text-3xl">{title}</h1>
          <p className="text-sm font-semibold">
            Welcome, Please enter your details
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayouts;
