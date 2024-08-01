"use client";

import ButtonDelete from "@/components/container/ButtonDelete";
import EditProduct from "@/components/container/EditProduct";
import SelectComponent from "@/components/container/SelectComponent";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useState } from "react";

type Product = {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
};

const ProductListView = () => {
    const [dataProduct, setData] = useState<{ data: Product[] }>();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState<string>("")

    const getData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/product?category=${category}`);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleTrigger = useCallback(() => {
        getData();
    }, []);

    useEffect(() => {
        getData();
    }, [category]);

    return (
        <Table>
            <TableCaption>A list of Product List</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>
                        <SelectComponent width="w-30" placeholder="Category" onChange={((e) => setCategory(e))} />
                    </TableHead>
                    <TableHead className="text-center">Edit</TableHead>
                    <TableHead className="text-center">Remove</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!loading ? (
                    dataProduct?.data?.map((product: Product) => {
                        return (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell className="text-center">
                                    <EditProduct
                                        id={product.id}
                                        onTriger={handleTrigger}
                                    />
                                </TableCell>
                                <TableCell className="text-center">
                                    <ButtonDelete
                                        id={product.id}
                                        link="/api/product"
                                        onTriger={handleTrigger}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })
                ) : (
                    <h1 className="right-[50%] font-bold absolute">
                        Loading...
                    </h1>
                )}
            </TableBody>
        </Table>
    );
};

export default ProductListView;
