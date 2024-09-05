import prisma from "@/lib/prisma";
import { getProductbyId } from "./Product";

type Cart = {
    id?: number
    productId: number,
    quantity: number
    userId: number,
}

export async function getCart() {
    const cart = await prisma.cart.findMany();
    
    if (!cart) {
        return null
    }

    const data = []

    for(let item of cart) {
        const product = await getProductbyId(item.productId)

        data.push({
            id: item.id,
            productId: item.productId,
            quantity: item.quantity,
            userId: item.userId,
            product: product
        })
    }

    return data
}

export async function getCartById(id: number) {
    const cart = await prisma.cart.findUnique({
        where:{id}
    })

    return cart
}

export async function addCart(data : Cart) {
    const cart = await prisma.cart.create({
        data
    })
    if (!cart) {
        return null
    }
    return cart
}

export async function updateCart(data : Cart) {
    const cart = await prisma.cart.update({
        where: {
            id: data.id
        },
        data
    })
    if (!cart) {
        return null
    }

    const product = await getProductbyId(cart.productId)

    const dataProduct = {
      id: cart.id,
      productId: cart.productId,
      quantity: cart.quantity,
      userId: cart.userId,
      product: product,
    };

    return dataProduct;
}

export async function deleteCart(id: number) {
    const cart = await prisma.cart.delete({
        where: {
            id: id
        }
    })

    return cart
}