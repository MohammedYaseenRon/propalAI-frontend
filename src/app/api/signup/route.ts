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
        const user: User = await req.json();

        if (!user.fullName || !user.email || !user.password) {
            return NextResponse.json({ error: "Missing requires fields" }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), "public", "users.json");

        let existingUser: User[] = [];

        try {
            const fileData = await readFile(filePath, "utf-8");
            existingUser = JSON.parse(fileData);
        } catch {
            existingUser = [];
        }

        const emailExist = existingUser.some(u => u.email === user.email);
        if (emailExist) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
        }

        existingUser.push(user);

        await writeFile(filePath, JSON.stringify(existingUser, null, 2));
        return NextResponse.json({ message: 'Signup successful' }, { status: 201 });

    } catch (error) {
        console.error('Signup Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}