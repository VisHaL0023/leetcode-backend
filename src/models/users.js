import { Schema, model } from "mongoose";
import { genSaltSync, hashSync } from "bcrypt";
// import { ServerConfig } from "../config/index.js";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            isEmail: true, //checks for email format
            trim: true,
        },
        image: {
            type: String,
        },
        password: {
            type: String,
            minLength: 5,
            required: true,
            match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/,
        },
        accountType: {
            type: String,
            required: true,
            default: "User",
            enum: ["User", "Admin"],
        },
        problemsData: [
            {
                type: Schema.Types.ObjectId,
                ref: "UserProblemData",
            },
        ],
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    const user = this;
    const salt = genSaltSync(9);
    const encryptedPassword = hashSync(user.password, salt);
    user.password = encryptedPassword;
    next();
});

const User = model("User", userSchema);

export default User;
