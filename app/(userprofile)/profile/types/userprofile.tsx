import { Double, ObjectId } from "mongodb";

export interface UserProfile {
    userId: ObjectId;
    full_name: String;
    email: String;
    password: String;
    about: String;
    current_weight: Double;
    starting_weight: Double;
    goal_weight: Double;
    water_intake: Double;
}
