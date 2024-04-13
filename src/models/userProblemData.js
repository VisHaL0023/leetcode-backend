import { Schema, model } from "mongoose";

const userProblemDataSchema = new Schema(
    {
        isLiked: {
            type: Boolean,
            default: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        isDisliked: {
            type: Boolean,
            default: false,
        },
        isAttempted: {
            type: Boolean,
            default: false,
        },
        problemId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Problem",
        },
    },
    { timestamps: true }
);

const UserProblemData = model("UserProblemData", userProblemDataSchema);

export default UserProblemData;
