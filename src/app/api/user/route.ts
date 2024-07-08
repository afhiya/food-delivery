import { signUp } from "@/lib/service"

type User = {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: string;
};

export async function POST(req: Request) {
    const {name, email, password} = await req.json()

    const data : User = {
        name,
        email,
        password,
        image : "",
        role : "user"
    }
    const addUser = await signUp(data)
    return new Response(JSON.stringify(addUser))
}