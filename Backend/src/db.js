import mongoose from 'mongoose';


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/rox_db", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, 
        });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1); 
    }
};


export default connectDB;
