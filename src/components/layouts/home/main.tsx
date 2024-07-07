import { Button } from "@/components/ui/button";
import Image from "next/image";

const Main = () => {
  return (
    <div className="w-full h-auto bg-secondary py-12 px-20">
      {/* Title */}
      <div className="font-bold flex justify-between items-center">
        <div>
          <h3 className="text-xs">Whats new?</h3>
          <h1 className="text-md text-muted">Choose our newest food!</h1>
        </div>
        <Button variant={"ghost"}>View More </Button>
      </div>
      {/* Content */}
      <div className="py-6 grid md:grid-cols-4 sm:grid-cols-3 grid-col-2 gap-2 ">
        <div className="w-56 h-auto px-2 pt-2 shadow-lg hover:cursor-pointer">
          <Image
            src="/assets/food_2.png"
            alt="Food Png"
            width={200}
            height={200}
            className="rounded-md"
          />
          <div className="p-2 font-bold">
            <h1 className="text-lg">Soto</h1>
            <h2 className="text-xs text-[#949494]">Category : Sup</h2>
            <h3 className="text-sm">Rp. 10.000</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
