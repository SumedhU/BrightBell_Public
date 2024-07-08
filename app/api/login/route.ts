import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import clientPromise from '@/app/mongodb';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';

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

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '100h' });
        return NextResponse.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);    
        const userid = searchParams.get('id') || '';
        const decodedToken = jwt.verify(userid, JWT_SECRET) as { userId: string };
        console.log(decodedToken.userId);
        const client = await clientPromise;
        const db = client.db();

        const user = await db.collection('FitnessEnthusiast').findOne({ _id: new ObjectId(decodedToken.userId) });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
