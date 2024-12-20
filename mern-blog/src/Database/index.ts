import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI
console.log(uri)
async function connectToDatabase(): Promise<void> {
    try {

        await mongoose.connect(uri!);
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch (error) {
        console.error("Error connecting to MongoDB with Mongoose:", error);
    }
}

connectToDatabase().catch(console.error);

export default connectToDatabase;
