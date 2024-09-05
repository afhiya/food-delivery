import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

type User = {
    name: string;
    email: string;
    password?: string;
    role: string;
};

export async function signUp(data: User) {
    if (!data.email || !data.password || !data.name) {
        return {
            status: 400,
            message: "Name, email and password cannot be empty",
        };
    }
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (user) {
        return { status: 400, message: "Account already exists" };
    }
    if (data.password.length < 8) {
        return { status: 400, message: "Password less than 8 characters" };
    }
    data.password = await bcrypt.hash(data.password, 10);
    const addUser = await prisma.user.create({ data });
    if (!addUser) {
        return { status: 400, message: "Account not created" };
    } else {
        return { status: 200, message: "Account successfully created" };
    }
}

export async function signIn(email: string) {
    const data = await prisma.user.findUnique({ where: { email: email } });
    if (data) {
        return data;
    } else {
        return null;
    }
}
