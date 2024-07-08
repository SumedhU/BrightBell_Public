import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../mongodb';
import { ObjectId } from 'mongodb';
import { UserProfile } from '../../(userprofile)/profile/types/userprofile';


export async function GET(req: NextRequest) {
    console.log("here");
    // return NextResponse.json({"heelo" : "hello"});
    const { searchParams } = new URL(req.url);
    const userid = searchParams.get('userid') || '';
    console.log(userid+'userid is ');
    const client = await clientPromise;
    const db = client.db();

    const logs = await db.collection('FitnessEnthusiast')
        .find({ _id: new ObjectId(userid) }).toArray();

    return NextResponse.json(logs);
}

export async function POST(req: NextRequest) {
    const userprofile: UserProfile = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('FitnessEnthusiast').insertOne(userprofile);

    return NextResponse.json({ id: result.insertedId });
}

export async function PUT(req: NextRequest) {
    const { id, ...userProfile }: { id: string; } & UserProfile = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('FitnessEnthusiast').updateOne(
        { _id: new ObjectId(id) },
        { $set: userProfile }
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

    const result = await db.collection('FitnessEnthusiast').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
        return NextResponse.json({ error: 'Log entry not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Log entry deleted successfully' });
}

