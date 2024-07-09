
import clientPromise from '@/app/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req : NextRequest) {
  console.log('------------------');
  console.log(req.method);
  if (req.method === 'GET') {
    const userId = req.nextUrl.searchParams.get('userId');
    console.log('---------------------------');
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    try {
      const client = await clientPromise;
      const db = client.db(); 
      const exercises = await db.collection('ExerciseLogs').find({ userId }).toArray();

      return NextResponse.json(exercises, { status: 200 });
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return NextResponse.json({ message: 'Internal Server Error', error: error }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }
}
