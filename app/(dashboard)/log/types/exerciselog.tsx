import { ObjectId } from "mongodb";

export interface ExerciseSet {
    setNumber: number;
    weightKg: number;
    reps: number;
}

export interface Exercise {
    exerciseName: string;
    sets: ExerciseSet[];
}

export interface ExerciseLog {
    userId: ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    waterIntakeLiters: number;
    exercises: Exercise[];
}
