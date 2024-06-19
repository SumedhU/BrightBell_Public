import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../mongodb';
import { ObjectId } from 'mongodb';
import { ExerciseLog } from '../types/exerciselog';

export async function POST(req: NextRequest) {
    const exerciseLog: ExerciseLog = await req.json();

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
    const { searchParams } = new URL(req.url);
    const userid = searchParams.get('userid') || '';
    const page = parseInt(searchParams.get('page') || '0', 10);
    const limit = 10;
    const skip = page * limit;

    const client = await clientPromise;
    const db = client.db();

    const logs = await db.collection('ExerciseLogs')
        .find({userId: userid })
        .skip(skip)
        .limit(limit)
        .toArray();

    return NextResponse.json(logs);
}