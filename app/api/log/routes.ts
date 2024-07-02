import { NextResponse } from 'next/server';
import clientPromise from '../../mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('ExerciseLogs');
  const log = await request.json();

  try {
    const result = await collection.insertOne(log);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add log entry' }, { status: 500 });
  }
}

export async function GET() {
  const client = await clientPromise;
  const db = client.db('brightbell');
  const collection = db.collection('logs');

  try {
    const logs = await collection.find({}).toArray();
    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch log entries' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const client = await clientPromise;
  const db = client.db('brightbell');
  const collection = db.collection('logs');
  const { id } = await request.json();

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Log entry deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Log entry not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete log entry' }, { status: 500 });
  }
}
