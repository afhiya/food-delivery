"use client";

import SelectComponent from "@/components/container/SelectComponent";
import { Button } from "@/components/ui/button";
import Form from "@/components/ui/Form";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductView = () => {
    const [loading, setLoading] = useState(false);
    const handleAddProduct = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        const form = event.target as HTMLFormElement;
        const formData = new FormData();
        formData.append("name", form.product.value);
        formData.append("price", form.price.value);
        formData.append("category", form.category.value);
        formData.append("image", form.image.files[0]);

        try {
            const response = await fetch("/api/product", {
                method: "POST",
                body: formData,
            });

            const dataProduct = await response.json();
            if (dataProduct.status == 200) {
                toast.success(`${dataProduct.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                toast.error(`${dataProduct.message}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
            form.reset();
        }
    };

    return (
        <div className="flex">
            <div className="flex flex-col py-10 px-16">
                <h1 className="text-3xl font-bold mb-4">Add Product</h1>
                <form onSubmit={handleAddProduct} className="flex flex-col">
                    <div className="mb-4">
                        <Form
                            name="product"
                            placeholder="Product Name"
                            type="text"
                            title="Product Name"
                        />
                    </div>
                    <div className="mb-4">
                        <Form
                            name="price"
                            type="number"
                            title="Product Price"
                        />
                    </div>
                    <div className="mb-4">
                        <SelectComponent width="w-full" placeholder="Select Category" />
                    </div>
                    <div className="mb-4">
                        <Form name="image" type="file" title="Product Image" />
                    </div>
                    <Button type="submit">
                        {loading ? "Loading..." : "Add Product"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AddProductView;
