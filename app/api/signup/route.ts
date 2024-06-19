import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import clientPromise from '../../../mongodb';

export async function POST(req: NextRequest) {
    const { full_name, email, password, about, current_weight, starting_weight, goal_weight, water_intake, workout_routine } = await req.json();

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
        full_name,
        email,
        password: hashedPassword,
        about,
        current_weight,
        starting_weight,
        goal_weight,
        water_intake,
        workout_routine
    };

    // Store the new user in the database
    const user = await db.collection('FitnessEnthusiast').insertOne(newUser);
    console.log(user);
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
