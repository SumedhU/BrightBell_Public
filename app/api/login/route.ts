import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import clientPromise from '@/app/mongodb';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        const client = await clientPromise;
        const db = client.db();

        const user = await db.collection('FitnessEnthusiast').findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        const cookie = serialize('auth', token, { path: '/', httpOnly: true, maxAge: 3600 });
        const response = NextResponse.json({ message: 'Login successful' });
        response.headers.set('Set-Cookie', cookie);
        response.headers.set('Location', '/home');
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
