import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";


interface User {
    fullName: string;
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing requires fields" }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), "public", "users.json");
        const fileData = await readFile(filePath, "utf-8");
        const users: User[] = JSON.parse(fileData);



        const user = users.find(
            (u) => u.email === email && u.password === password
        );
        if (!user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 401 });
        }

        return NextResponse.json({
            message: 'Login successful',
            user: { fullName: user.fullName, email: user.email }
        }, { status: 200 });
    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}