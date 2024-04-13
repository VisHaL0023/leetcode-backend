import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        userId: {
            type: Schema.type.ObjectId,
            required: true,
            ref: "User",
        },
        userName: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            max: [250, "Review cannot be of more than 250 characters"],
        },
        commentLike: {
            type: Number,
        },
    },
    { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;
