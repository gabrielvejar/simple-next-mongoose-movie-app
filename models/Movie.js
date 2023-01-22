import mongoose from "mongoose";

const MovieSchema =  new mongoose.Schema({
    title: {
        type: String,
        required: [true, "por favor ingresa titulo"],
    },
    plot: {
        type: String,
        required: [true, "por favor ingresa plot"],
    },
})

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema)