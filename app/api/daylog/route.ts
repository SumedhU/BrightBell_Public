import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../mongodb';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);    
    const logid = searchParams.get('logId') || '';

    const client = await clientPromise;
    const db = client.db();

    const logs = await db.collection('ExerciseLogs')
        .find({_id: new ObjectId(logid)})
        .toArray();

    return NextResponse.json(logs);
}