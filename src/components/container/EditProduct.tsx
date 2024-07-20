import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import Form from "../ui/Form";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EditProduct = ({ id }: { id: number }) => {
    const router = useRouter()
    const handleReplaceProduct = async (event: FormEvent) => {
        event.preventDefault;
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append("id", id.toString());

        try {
            const response = await fetch("/api/product", {
                method: "PUT",
                body: formData,
            });
            const dataUpdate = await response.json();
            if (dataUpdate.status == 200) {
                toast.success(`${dataUpdate.message}`, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                toast.error(`${dataUpdate.message}`, {
                    position: "bottom-center",
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
            console.log("Error", error);
        } finally{
            setTimeout(() => {
                router.refresh();
            }, 4000);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"destructive"} size={"icon"}>
                    <Pencil1Icon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                    <DialogDescription>
                        Make changes to data product here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleReplaceProduct}>
                    <Form
                        name="product"
                        type="text"
                        title="Product Name"
                        placeholder="Change Product Name"
                    />
                    <Form
                        name="price"
                        type="number"
                        title="Product Price"
                        placeholder="Change Product Pice"
                    />
                    <Form name="image" type="file" title="Product Image" />
                    <DialogFooter>
                        <DialogTrigger asChild>
                            <Button type="submit">Save Changes</Button>
                        </DialogTrigger>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProduct;
