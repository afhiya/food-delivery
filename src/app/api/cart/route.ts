import { addCart, deleteCart, getCart, getCartById, updateCart } from "@/services/Cart";

export async function GET(req: Request) {
    if(req) {
        const {searchParams} = new URL(req.url)

        const userId = searchParams.get('userId') as string
        const data = await getCartById(parseInt(userId) as number)
        Response.json(data)
    }

    const data = await getCart();
    return new Response(JSON.stringify(data));
}

export async function POST(req: Request) {
    const {userId, productId, quantity} = await req.json()
    const dataCart = {
        userId,
        productId,
        quantity
    }
    const data = await addCart(dataCart)

    return Response.json(data)
}

export async function PUT(req: Request) {
    const {id, userId, productId, quantity} = await req.json()

    const dataPut = {
        id,
        userId,
        productId,
        quantity
    }
    const data = await updateCart(dataPut)
    return Response.json(data)
}

export async function DELETE(req: Request) {
    const { id } = await req.json();

    const data = await deleteCart(id);
    return Response.json(data);
}