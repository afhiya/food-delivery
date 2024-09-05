import Image from "next/image";
import AddToCart from "./AddToCart";

type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
}

const ListProduct = ({
    api,
}: {
    api:
        | {
              data: Product[];
          }
        | undefined;
}) => {
    return (
        <div className="py-6">
            {api?.data?.length ? (
                <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-col-2 gap-5 justify-center items-center">
                    {api.data.map((item: Product, index: number) => {
                        return (
                          <div
                            className="w-full h-auto px-2 pt-2 bg-[#f3f3f3] shadow-lg rounded-sm hover:cursor-pointer transform hover:scale-105 transition-all duration-400"
                            key={index}
                          >
                            <Image
                              src={item?.image}
                              priority
                              alt="Food Png"
                              width={250}
                              height={250}
                              className="rounded-md w-auto h-auto"
                            />
                            <div className="p-2 font-bold text-center">
                              <h1 className="text-lg text-gray-800">
                                {item?.name}
                              </h1>
                              <h2 className="text-xs text-[#949494]">
                                Category: {item?.category}
                              </h2>
                              <h3 className="text-sm text-muted">
                                Rp. {item?.price}
                              </h3>
                            </div>
                            <AddToCart items={item} />
                          </div>
                        );
                    })}
                </div>
            ) : (
                <h3 className="text-center text-lg text-secondary/90 font-semibold">
                    Tidak ada produk
                </h3>
            )}
        </div>
    );
};

export default ListProduct;
