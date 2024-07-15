import { supabase } from './supabase';
import bcrypt  from 'bcrypt';
import prisma from "./prisma"

type User = {
    name: string
    email: string
    password?: string 
    role: string
}

type Product = {
    name: string,
    price: number,
    image: File
}

export async function signUp(data: User) {
    if(!data.email || !data.password || !data.name){
        return {status: 400, message:"Name, email and password cannot be empty"}
    }
    const user = await prisma.user.findUnique({where: {email: data.email}})
    if(user){
        return {status: 400, message:"Account already exists"}
    }
    if (data.password.length < 8) {
      return { status: 400, message: "Password less than 8 characters" };
    }
    data.password = await bcrypt.hash(data.password, 10)
    const addUser = await prisma.user.create({data})
    if(!addUser){
        return {status: 400, message:"Account not created"}
    } else {
        return {status: 200, message:"Account successfully created"}
    }
}

export async function signIn(email: string) {
    const data = await prisma.user.findUnique({where: {email: email}})
    if(data) {
        return data
    } else {
        return null
    }
}

export async function addProduct(dataReq: Product){
    if(!dataReq.name || !dataReq.price || !dataReq.image.name){
        return {status: 400, message:"Name, price and image cannot be empty"}
    }
    const product = await prisma.product.findFirst({where: {name: dataReq.name}})

    if(product){
        return {status: 400, message:"Product already exists"}
    }
    if(dataReq.image.type !== "image/png"){
        return {
          status: 400,
          message: "Invalid image format,Files must be of type PNG",
        };
    }
    const imageUrl = await uploadImage(dataReq.image)
    const data : any = {
        name: dataReq.name,
        price: dataReq.price,
        image: imageUrl.path
    }
    const addProduct = await prisma.product.create({data})
    if(!addProduct){
        return {status: 400, message:"Product not created"}
    } else {
        return {status: 200, message:"Product successfully created"}
    }
}

export async function uploadImage(file: File) {
  const { data, error } = await supabase.storage
    .from("image")
    .upload(file.name, file, {
      cacheControl: "3600",
      upsert: false,
    });
     if (error) {
       throw new Error(error.message);
     }
     return data
}
