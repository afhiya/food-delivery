import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ListProduct from "./ListProduct";
import Link from "next/link";
import Loading from "../ui/loading";

type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
};

const MainView = ({
    Category,
    Title,
    SubTitle,
}: {
    Category: string;
    Title: string;
    SubTitle: string;
}) => {
    const [product, setProduct] = useState<{ data: Product[] }>();
    const [loading, setLoading] = useState<boolean>(true);

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `/api/product?limit=8&category=${Category}`
            );
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="w-full h-auto bg-secondary py-12 px-20">
            {/* Title */}
            <div className="font-bold flex justify-between items-center">
                <div>
                    <h3 className="text-xs">{Title}</h3>
                    <h1 className="text-md text-muted">{SubTitle}</h1>
                </div>
                <Link href="/menu">
                    <Button variant={"ghost"}>View More</Button>
                </Link>
            </div>
            {/* Content */}
            {loading ? (
                <Loading />
            ) : (
                <ListProduct api={product} />
            )}
        </div>
    );
};

export default MainView;
