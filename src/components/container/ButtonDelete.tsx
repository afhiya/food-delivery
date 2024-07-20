import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ButtonDelete = ({ id, link }: {
    id: number,
    link : string
}) => {
    const router = useRouter();
    const handleDelete = async (event: any) => {
        event.preventDefault();
        const data = { id };
        try {
            const response = await fetch(`${link}`, {
                method: "DELETE",
                body: JSON.stringify(data),
            });
            const dataDelete = await response.json();
            if (dataDelete.status == 200) {
                toast.success(`${dataDelete.message}`, {
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
                toast.error(`${dataDelete.message}`, {
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
            console.log("error", error);
        } finally{
            setTimeout(() => {
                router.refresh();
            }, 4000);
        }
    };

    return (
        <Button variant={"ghost"} size={"sm"} onClick={handleDelete}>
            <Cross1Icon />
        </Button>
    );
};

export default ButtonDelete;
