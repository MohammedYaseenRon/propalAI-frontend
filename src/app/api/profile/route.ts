import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

interface User {
    fullName: string;
    email: string;
    password?: string;
}


const filePath = path.join(process.cwd(), 'public', 'users.json');

export async function POST(req: Request) {
    const { fullName, email, password } = await req.json();

    const data = await readFile(filePath, 'utf-8');
    const users: User[] = JSON.parse(data);

    const index = users.findIndex((user) => user.fullName === fullName);
    if (index === -1) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    users[index].email = email;
    if (password) users[index].password = password;

    await writeFile(filePath, JSON.stringify(users, null, 2));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = users[index];
    return NextResponse.json({ user: safeUser }, { status: 200 });
}


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const fullNameParam = searchParams.get('fullName');

    if (!fullNameParam) {
        return NextResponse.json({ error: 'Full name required' }, { status: 400 });
    }

    try {
        const data = await readFile(filePath, 'utf-8');
        const users: User[] = JSON.parse(data);

        const user = users.find((u) =>
            u.fullName.trim().toLowerCase() === fullNameParam.trim().toLowerCase()
        );

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...safeUser } = user;
        return NextResponse.json({ user: safeUser }, { status: 200 });
    } catch (error) {
        console.error('Error reading users:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}