import mongoose from "mongoose";

const MovieSchema =  new mongoose.Schema({
    title: {
        type: String,
        require: [true, "por favor ingresa titulo"],
    },
    plot: {
        type: String,
        require: [true, "por favor ingresa plot"],
    },
})

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema)