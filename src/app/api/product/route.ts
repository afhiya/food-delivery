import { addProduct, deleteProduct, getProduct, updateProduct } from "@/lib/service"

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

export async function GET(){
  const data = await getProduct() 
  return Response.json({data})
}

export async function DELETE(req: Request){
  const { id } = await req.json()

  const data = await deleteProduct(id)
  return Response.json(data)
}

export async function PUT(req:Request){
  const form = await req.formData()

  const data = {
      id: parseInt(form.get("id") as string) as number,
      name: form.get("product") as string,
      price: parseInt(form.get("price") as string) as number,
      image: form.get("image") as File,
  };

  const update = await updateProduct(data)

  return Response.json(update)
}