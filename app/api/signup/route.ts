import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import clientPromise from '../../../app/mongodb';

export async function POST(req: NextRequest) {
    const { firstname, lastname,email,phone,username,password, about, currentweight, startweight, goalweight, waterintake, workoutIntensity } = await req.json();

    const client = await clientPromise;
    const db = client.db();

    // Check if the user already exists
    const userExists = await db.collection('FitnessEnthusiast').findOne({ email });
    if (userExists) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const newUser = {
        firstname,
        lastname,
        email,
        phone,
        username,
        password: hashedPassword,
        about,
        currentweight,
        startweight,
        goalweight,
        waterintake,
        workoutIntensity
    };

    // Store the new user in the database
    const user = await db.collection('FitnessEnthusiast').insertOne(newUser);
    console.log(user);
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
