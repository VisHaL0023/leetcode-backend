import { Schema, model } from "mongoose";

const problemSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        problemNumber: {
            type: String,
            required: true,
        },
        problemDescription: {
            type: String,
        },
        totalLikes: {
            type: Number,
        },
        totalDislike: {
            type: Number,
        },
        category: {
            type: String,
            required: true,
        },
        videoId: {
            type: String,
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        tag: {
            type: [String],
        },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
        },
    },
    { timestamps: true }
);

const Problem = model("Problem", problemSchema);

export default Problem;
