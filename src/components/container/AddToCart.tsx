import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addSliceCart, getSliceCart, updateSliceCart } from "@/hooks/redux/Slices/carts";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";



const AddToCart = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
  };
}) => {

  const { data } = useSession()
  const [value, setValue] = useState<number>(1)
  const dispatch = useAppDispatch()
  const state = useAppSelector((state) => state.cart)
  const handleAddCart = () => {
    const dataCart = {
      userId: data?.user?.id ?? 0,
      productId: items?.id,
      quantity: value,
    };
    const cart = state?.data.find((item) => item.productId === items.id);
  
    if (cart) {
      const newData = {
        id: cart.id,
        userId: cart.userId,
        productId: cart.productId,
        quantity: cart.quantity + value,
      };
      dispatch(updateSliceCart(newData));
    } else {
      dispatch(addSliceCart(dataCart));
      toast.success(`${state?.message}`, {
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
  };

  useEffect(() => {
    if(!data){
      return
    }else{
      dispatch(getSliceCart(data?.user?.id as number))
    }
  },[data?.user.id])

  return (
    <Dialog>
      <DialogTrigger className="absolute bottom-2 right-2 bg-muted text-white text-xs font-semibold py-1 px-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <circle cx="10.5" cy="19.5" r="1.5"></circle>
            <circle cx="17.5" cy="19.5" r="1.5"></circle>
            <path d="M13 13h2v-2.99h2.99v-2H15V5.03h-2v2.98h-2.99v2H13V13z"></path>
            <path d="M10 17h8a1 1 0 0 0 .93-.64L21.76 9h-2.14l-2.31 6h-6.64L6.18 4.23A2 2 0 0 0 4.33 3H2v2h2.33l4.75 11.38A1 1 0 0 0 10 17z"></path>
          </svg>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>My Cart</DialogTitle>
          <DialogDescription>
            {`Choose the nominal value of the items you want to add to your cart.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row gap-4 align-middle">
          <section className="flex-shrink">
            <Image src={items.image} width={150} height={150} alt={`Image ${items.name}`} className="w-auto h-auto rounded-lg shadow-sm" />
          </section>
          <div className="flex-shrink-0">
                <h1 className="text-lg font-bold">{items.name}</h1>
                <h2 className="text-sm font-semibold">Price Rp. {items.price}</h2>
              <div className="flex w-full gap-2 mt-5">
                  <Button size={"icon"} onClick={(() => setValue(value - 1))} disabled={value <= 1} >-</Button>
                  <Input className="w-10 h-8 text-center text-primary font-bold" disabled value={value} />
                  <Button size={"icon"} onClick={(() => setValue(value + 1))}>+</Button>
              </div>
            </div>
          </div>
      <DialogFooter>
        <DialogTrigger onClick={handleAddCart} className="bg-primary text-white text-sm font-semibold py-2 px-3 rounded-lg">
          Add to Cart
        </DialogTrigger>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCart;
