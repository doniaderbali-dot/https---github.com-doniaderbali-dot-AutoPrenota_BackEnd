import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error("MONGO_URI non definita nel file .env");
        }

        await mongoose.connect(uri);
        console.log('✅ Connesso a MongoDB Atlas tramite .env!');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;