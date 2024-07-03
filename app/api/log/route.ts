import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../mongodb';
import { ObjectId } from 'mongodb';
import { ExerciseLog } from '../../(dashboard)/log/types/exerciselog';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
    const exerciseLog = await req.json();
    console.log(exerciseLog);
    
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('ExerciseLogs').insertOne(exerciseLog);

    return NextResponse.json({ id: result.insertedId });
}

export async function PUT(req: NextRequest) {
    const { id, ...exerciseLog }: { id: string; } & ExerciseLog = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('ExerciseLogs').updateOne(
        { _id: new ObjectId(id) },
        { $set: exerciseLog }
    );

    if (result.matchedCount === 0) {
        return NextResponse.json({ error: 'Log entry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Log entry updated successfully' });
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('ExerciseLogs').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
        return NextResponse.json({ error: 'Log entry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Log entry deleted successfully' });
}

export async function GET(req: NextRequest) {
    const userCookie = cookies().get("auth");
        const cookieValue = userCookie?.value;

        if (!cookieValue) {
            return NextResponse.json({ error: 'Cookie not found or invalid' }, { status: 401 });
        }

        const decodedToken = jwt.verify(cookieValue, JWT_SECRET) as { userId: string };

        console.log(decodedToken.userId);

        const client = await clientPromise;
        const db = client.db();
        const logs = await db.collection('ExerciseLogs')
            .find({userId: decodedToken.userId})
            .toArray();
    
    return NextResponse.json(logs);
}