import mongoose from "mongoose";

const receipeSchema  = mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    process: {
        type: String,
        required: true,
    }
    });

export const Receipe = mongoose.model('Receipe', receipeSchema);