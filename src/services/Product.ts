import { supabase } from "../lib/supabase";
import prisma from "../lib/prisma";

type Product = {
    name: string;
    price: number;
    image: File;
    category: string;
};

export async function getProduct() {
    const product = await prisma.product.findMany();
    const data = [];

    for (let i = 0; i < product.length; i++) {
        const dataImage = await getImage(product[i].image);
        data.push({
            id: product[i].id,
            name: product[i].name,
            image: dataImage.publicUrl,
            price: product[i].price,
            category: product[i].category,
        });
    }
    return data;
}

export async function getProductbyId(id: number){
    const product = await prisma.product.findUnique({
        where: { id : id}
    });

    const image = await getImage(product?.image as string);
    const data = {
        id: product?.id,
        name: product?.name,
        image: image.publicUrl,
        price: product?.price,
        category: product?.category
    }

    return data
}

export async function addProduct(dataReq: Product) {
    if (
        !dataReq.name ||
        !dataReq.price ||
        !dataReq.image.name ||
        !dataReq.category
    ) {
        return {
            status: 400,
            message: "Name, price and image cannot be empty",
        };
    }
    const product = await prisma.product.findFirst({
        where: { name: dataReq.name },
    });

    if (product) {
        return { status: 400, message: "Product already exists" };
    }
    if (dataReq.image.type !== "image/png") {
        return {
            status: 400,
            message: "Invalid image format,Files must be of type PNG",
        };
    }
    const {
        dataImage,
        error,
    }: {
        dataImage: {
            id: string;
            path: string;
            fullPath: string;
        } | null;
        error: any | null;
    } = await uploadImage(dataReq.image);
    if (error) return { status: error?.statusCode, message: error?.message };
    const data:
        | {
              name: string;
              price: number;
              image: string | undefined;
              category: string;
          }
        | any = {
        name: dataReq.name,
        price: dataReq.price,
        image: dataImage?.path,
        category: dataReq.category,
    };
    const addProduct = await prisma.product.create({ data });
    if (!addProduct) {
        return { status: 400, message: "Product not created" };
    } else {
        return { status: 200, message: "Product successfully created" };
    }
}

export async function updateProduct(req: {
    id: number;
    name: string;
    price: number;
    image: File;
}) {
    const { id, name, price, image } = req;
    if (!name || !price || !image.name) {
        return {
            status: 400,
            message: "Name, price and image cannot be empty",
        };
    }
    if (image.type !== "image/png") {
        return {
            status: 400,
            message: "Invalid image format,Files must be of type PNG",
        };
    }
    const findData = await prisma.product.findUnique({ where: { id: id } });

    await deleteImage(findData?.image);
    const {
        dataImage,
        error,
    }: {
        dataImage: {
            id: string;
            path: string;
            fullPath: string;
        } | null;
        error: any | null;
    } = await uploadImage(req.image);
    if (error) return { status: error?.statusCode, message: error?.message };
    const replaceProduct = await prisma.product.update({
        where: { id: id },
        data: { name: name, price: price, image: dataImage?.path },
    });
    if (!replaceProduct) {
        return { status: 400, message: "Product not updated" };
    } else {
        return { status: 200, message: "Product successfully updated" };
    }
}

export async function deleteProduct(id: number) {
    const findProduct = await prisma.product.findUnique({ where: { id: id } });

    await deleteImage(findProduct?.image);
    const deleteProduct = await prisma.product.delete({ where: { id: id } });

    if (!deleteProduct) {
        return { status: 400, message: "Product not deleted" };
    } else {
        return { status: 200, message: "Product successfully deleted" };
    }
}

// Service Image Storage in Supabase

export async function getImage(path: string) {
    const { data } = await supabase.storage.from("image").getPublicUrl(path);

    return data;
}

export async function uploadImage(file: File) {
    const { data, error } = await supabase.storage
        .from("image")
        .upload(file.name, file, {
            cacheControl: "3600",
            upsert: false,
        });

    return { dataImage: data, error };
}

export async function deleteImage(path: string | any) {
    const { error } = await supabase.storage.from("image").remove([path]);
    if (error) {
        throw new Error(error.message);
    }
}
