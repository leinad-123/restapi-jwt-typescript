import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL as string, {
})
    .then(db => console.log(">Database connected"))
    .catch(err => console.error(err));