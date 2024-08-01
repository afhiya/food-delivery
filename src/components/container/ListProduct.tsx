import Image from "next/image";

type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
};

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
                                    className="rounded-md"
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
                                <button className="absolute bottom-2 right-2 bg-muted text-white text-xs font-semibold py-1 px-2 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            cx="10.5"
                                            cy="19.5"
                                            r="1.5"
                                        ></circle>
                                        <circle
                                            cx="17.5"
                                            cy="19.5"
                                            r="1.5"
                                        ></circle>
                                        <path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path>
                                        <path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"></path>
                                    </svg>
                                </button>
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
