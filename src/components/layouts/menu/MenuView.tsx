"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { Input } from "../../ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import ListProduct from "../../container/ListProduct";
import Loading from "../../ui/loading";
import ProductView from "@/components/container/ProductView";

type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
};

const MenuView = () => {
    const [category, setCategory] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [value] = useDebounce(search, 500);

    const categories: Array<{
        title: string;
        value: string;
        icon: string;
    }> = [
        {
            title: "All",
            value: "",
            icon: "",
        },
        {
            title: "Food",
            value: "food",
            icon: "🍔",
        },
        {
            title: "Drink",
            value: "drink",
            icon: "🍷",
        },
        {
            title: "Snack",
            value: "snack",
            icon: "🍟",
        },
    ];

    return (
        <div className="w-full">
            <header className="relative w-auto h-72 my-6 mx-8 overflow-hidden rounded-lg shadow-lg bg-muted">
                <div className="absolute w-[650px] h-96 bg-accent rounded-full rotate-[32deg] -top-28 -right-24 opacity-80 blur-sm"></div>
                <div className="absolute w-[650px] h-96 bg-primary rounded-full rotate-[32deg] bottom-72 -left-20 opacity-80 blur-sm"></div>
                <div className="absolute w-[650px] h-96 bg-secondary/90 rounded-full rotate-[32deg] -bottom-72 -left-10 opacity-80 blur-sm"></div>
                <Input
                    className="absolute w-2/4 h-10 text-md font-medium bg-white z-10 top-[40%] left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md focus:outline-none focus:ring-2 focus:ring-secondary rounded-full px-4"
                    placeholder="Search Your Menu"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <Cross1Icon
                        className="w-6 h-6 text-primary/80 absolute top-[103px] right-80 cursor-pointer z-20"
                        onClick={() => setSearch("")}
                    />
                )}
                <div className="flex justify-center items-center gap-10 absolute cursor-pointer top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {categories.map((item) => {
                        return (
                            <h2
                                className={`w-auto text-md font-medium py-1 px-4 selection:bg-none ${
                                    category === item.value
                                        ? "text-secondary bg-primary/90 rounded-full transition-all"
                                        : "text-primary"
                                }`}
                                key={item.value}
                                onClick={() => setCategory(item.value)}
                            >
                                {item.icon} {item.title}
                            </h2>
                        );
                    })}
                </div>
            </header>
            <section className="w-auto my-6 mx-8 py-4 px-8 bg-primary/80 rounded-md">
                <ProductView category={category} keyword={value} />
            </section>
        </div>
    );
};

export default MenuView;
