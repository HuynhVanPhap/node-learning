import mongoose from 'mongoose';

export const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(
            () => console.log('Connect successfully!!!')
        );
    } catch (error) {
        console.log(error);
    }
}