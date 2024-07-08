import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../mongodb';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: NextRequest) {
    const exerciseLog = await req.json();
    const decodedToken = jwt.verify(exerciseLog.userId, JWT_SECRET) as { userId: string };
    exerciseLog.userId = decodedToken.userId;
    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('ExerciseLogs').insertOne(exerciseLog);
    return NextResponse.json({ id: result.insertedId });
}

export async function PUT(req: NextRequest) {
    const exerciseLog = await req.json();

    const client = await clientPromise;
    const db = client.db();
    const decodedToken = jwt.verify(exerciseLog.userId, JWT_SECRET) as { userId: string };
    exerciseLog.userId = decodedToken.userId;

    const result = await db.collection('ExerciseLogs').updateOne(
        { userId : exerciseLog.userId },
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
    const { searchParams } = new URL(req.url);
    const userid = searchParams.get('id') || '';

    const decodedToken = jwt.verify(userid, JWT_SECRET) as { userId: string };
        console.log("hello");
        
        console.log(decodedToken.userId);

        const client = await clientPromise;
        const db = client.db();
        const logs = await db.collection('ExerciseLogs')
            .find({userId: decodedToken.userId})
            .toArray();
    
    return NextResponse.json(logs);
}