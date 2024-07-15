import { addProduct } from "@/lib/service"

type Product = {
  name: string;
  price: number;
  image: File;
};

export async function POST(req: Request) {
    const form = await req.formData()
    const name = form.get('name') as string
    const price = form.get('price') as string
    const image = form.get('image') as File

    const data: Product = {
      name,
      price : parseInt(price),
      image
    }
    
    const product = await addProduct(data)
    return new Response(JSON.stringify(product))
}
