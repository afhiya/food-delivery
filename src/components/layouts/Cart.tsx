import { useAppDispatch, useAppSelector } from "@/hooks";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { deleteSliceCart, updateSliceCart } from "@/hooks/redux/Slices/carts";
import currencyFormatter from "currency-formatter";
import { CheckedState } from "@radix-ui/react-checkbox";
import {
  addCheckout,
  deleteCheckout,
  updateCheckout,
} from "@/hooks/redux/Slices/checkout";
import { TrashIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";

const Cart = () => {
  const data = useSession();
  const state = useAppSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="relative cursor-default">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        onClick={() => setOpen(!open)}
      >
        <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path>
        <circle cx="10.5" cy="19.5" r="1.5"></circle>
        <circle cx="17.5" cy="19.5" r="1.5"></circle>
      </svg>
      {data && (
        <h1 className="w-auto py-1 px-2 text-center text-xs font-semibold bg-muted text-secondary rounded-full absolute -top-1 -right-1">
          {state?.data.length}
        </h1>
      )}
      <CartView open={open} data={state?.data} />
    </div>
  );
};

type Cart = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    category: string;
  };
};

const CartView = ({ open, data }: { open: boolean; data: any }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const checkoutState = useAppSelector((item) => item.checkout);
  const router = useRouter();

  const handleUpdateCart = (item: Cart, value: number) => {
    const quantityNew = value === -1 ? item?.quantity - 1 : item?.quantity + 1;
    const dataCart = {
      id: item?.id,
      userId: item?.userId,
      productId: item?.productId,
      quantity: quantityNew,
    };
    if (checkoutState.data.length > 0) {
      const newData = {
        id: item?.id,
        quantity: quantityNew,
      };
      dispatch(updateCheckout(newData as Cart & void));
    }
    dispatch(updateSliceCart(dataCart));
  };

  const handleChecked = (checked: CheckedState, data: Cart) => {
    if (checked) {
      dispatch(addCheckout(data as Cart & void));
    } else {
      dispatch(deleteCheckout(data as Cart & void));
    }
  };

  const handleDeleteCart = (data: Cart) => {
    dispatch(deleteSliceCart(data.id as number));
    if (checkoutState.data.length > 0) {
      dispatch(deleteCheckout(data as Cart & void));
    }
  };

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } w-[350px] h-auto bg-secondary py-2 px-4 absolute overflow-hidden -right-28 border border-primary`}
    >
      <h1 className="font-bold text-xl text-center">My Cart</h1>
      <div className="flex flex-col h-[400px] overflow-y-auto">
        {data.length <= 0 ? (
          <h1 className="text-center font-medium text-base">
            Not Found Product
          </h1>
        ) : (
          data.map((item: Cart) => {
            return (
              <div className="flex flex-col mx-4 my-2" key={item?.id}>
                <div className="flex flex-row gap-4 py-2 border-primary border-b-2 relative">
                  <div className="basis-5/12">
                    <Image
                      src={item?.product?.image}
                      alt="Food Png"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="text-left leading-4">
                    <h3 className="font-bold text-base">
                      {item?.product?.name}
                    </h3>
                    <h5 className="medium text-xs ">
                      Category : {item?.product?.category}
                    </h5>
                    <h6 className="mb-2 text-sm font-light">
                      Price :{" "}
                      {currencyFormatter.format(item?.product?.price, {
                        code: "IDR",
                      })}
                    </h6>
                    <div className="flex w-full gap-2">
                      <Button
                        size={"icon"}
                        className="w-6 h-6"
                        onClick={() => handleUpdateCart(item, -1)}
                        disabled={item?.quantity <= 1}
                      >
                        -
                      </Button>
                      <Input
                        className="w-10 h-6 text-center disabled:text-primary font-bold p-2"
                        disabled
                        value={item?.quantity}
                      />
                      <Button
                        size={"icon"}
                        className="w-6 h-6"
                        onClick={() => handleUpdateCart(item, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <button
                    className="bg-muted text-secondary p-2 rounded-xl absolute top-1 right-0"
                    onClick={() => handleDeleteCart(item)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <Checkbox onCheckedChange={(e) => handleChecked(e, item)} />
                  <h4 className="text-sm font-semibold text-center pt-1">
                    {currencyFormatter.format(
                      item?.product?.price * item?.quantity,
                      { code: "IDR" }
                    )}
                  </h4>
                </div>
              </div>
            );
          })
        )}
      </div>
      {data.length > 0 && (
        <footer>
          <h3 className="text-sm font-semibold text-right">
            Total :
            {currencyFormatter.format(
              checkoutState.data?.reduce(
                (a: any, b: any) => a + b.quantity * b?.product?.price,
                0
              ) | 0,
              { code: "IDR" }
            )}
          </h3>
          <Button
            className="w-full bg-primary text-secondary font-bold"
            disabled={checkoutState.data.length <= 0}
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                router.push("/checkout");
                setLoading(false);
              }, 3000);
            }}
          >
            {loading ? "Loading..." : "Checkout"}
          </Button>
        </footer>
      )}
    </div>
  );
};

export default Cart;
