import {
    addProduct,
    deleteProduct,
    getProduct,
    updateProduct,
} from "@/services/Product";

type Product = {
    name: string;
    price: number;
    category: string;
    image: File;
};

export async function POST(req: Request) {
    const form = await req.formData();
    const name = form.get("name") as string;
    const price = form.get("price") as string;
    const category = form.get("category") as string;
    const image = form.get("image") as File;

    const data: Product = {
        name,
        price: parseInt(price),
        category,
        image,
    };

    const product = await addProduct(data);
    return new Response(JSON.stringify(product));
}

export async function GET(req: Request) {
    const product = await getProduct();
    const data = product.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
    const { searchParams } = new URL(req.url);
    if (searchParams) {
        const limit = searchParams.get("limit");
        const category = searchParams.get("category");
        const keyword = searchParams.get("keyword")
        const dataCategory = data.filter(
          (item) => item.category === category
        )
        if (limit && category) {
          const dataLimit = {
            data: [...dataCategory.slice(0, parseInt(limit))]
          }
            return Response.json(dataLimit);
        }
        if(keyword && category) {
            const searchCategory = dataCategory.filter((a) => a.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) && a.category === category);
            return Response.json({data : searchCategory})
        }
        if(keyword) {
            const dataSearch = data.filter((a) => a.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
            return Response.json({data : dataSearch})
        }
        if(category) {
          return Response.json({ data: dataCategory });
        }
    }
    return Response.json({ data });
}

export async function DELETE(req: Request) {
    const { id } = await req.json();

    const data = await deleteProduct(id);
    return Response.json(data);
}

export async function PUT(req: Request) {
    const form = await req.formData();
    const { searchParams } = new URL(req.url);

    const data = {
        id: parseInt(searchParams.get("id") as string) as number,
        name: form.get("product") as string,
        price: parseInt(form.get("price") as string) as number,
        image: form.get("image") as File,
    };

    const update = await updateProduct(data);

    return Response.json(update);
}
