import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
      <div className="w-full h-auto gap-5 bg-accent flex sm:flex-row flex-col justify-center items-center p-12 ">
          <div className="">
              <h1 className="text-5xl font-bold">
                  Find your favorite food here!
              </h1>
              <p className="text-lg font-semibold py-5">
                  ZuttoFood is a leading platform for high-quality food
                  products. We prioritize customer satisfaction by offering a
                  selection of innovative and delicious products. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <Button size={"xl"} className="mt-2">
                  <Link href="/menu">Show Menu</Link>
              </Button>
          </div>
          <div>
              <Image
                  src="/assets/menu_2.png"
                  alt="..."
                  width={700}
                  height={700}
              />
          </div>
      </div>
  );
};

export default Header;
