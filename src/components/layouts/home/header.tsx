import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full h-auto gap-5 bg-accent flex sm:flex-row flex-col justify-center items-center  p-12">
      <div className="">
        <h1 className="text-5xl font-bold">Find your favorite food here!</h1>
        <p className="text-lg font-semibold py-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          iusto sunt ad facere sapiente obcaecati, odio aperiam dolorem deserunt
          omnis cupiditate dolore enim nam expedita.
        </p>
        <Button size={"xl"} className="mt-2">
          <Link href="/menu">Show Menu</Link>
        </Button>
      </div>
      <div>
        <Image src="/assets/menu_2.png" alt="..." width={700} height={700} />
      </div>
    </div>
  );
};

export default Header;
