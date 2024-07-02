import { ObjectId } from "mongodb";

export interface ExerciseSet {
    weight: number;
    reps: number;
    unit: String;
}

export interface Exercise {
    name: string;
    sets: ExerciseSet[];
}

export interface ExerciseLog {
    userId: ObjectId;
    date: string;
    currentWeight: number;
    currentWeightUnit: String;
    waterIntakeLiters: number;
    waterIntakeUnit: String;
    exercises: Exercise[];
}
