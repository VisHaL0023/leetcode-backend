import { UserService } from "../services/index.js";
import { errorObj, successObj } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";

let userService;
class AuthController {
    constructor() {
        userService = new UserService();
    }

    async createUser(req, res) {
        try {
            // destructure all values
            const { firstName, lastName, email, password, accountType, otp } =
                req.body;

            // Check if all required fields are present
            if (
                !firstName ||
                !lastName ||
                !email ||
                !password ||
                !accountType ||
                !otp
            ) {
                errorObj.message = "All fields are required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            // Calling user-service for creating user
            const response = await userService.signUp({
                firstName,
                lastName,
                email,
                password,
                accountType,
                otp,
            });

            successObj.message = "Successfully created a new user";
            successObj.data = response;

            return res.status(StatusCodes.CREATED).json(successObj);
        } catch (error) {
            // Handle errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async logIn(req, res) {
        try {
            // Distructure all values
            const { email, password } = req.body;

            // Checking all required fields are present
            if (!email || !password) {
                errorObj.message = "All fields are required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            // Calling user-service for loggin the user
            const response = await userService.signIn(req.body);

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            // sending cookies with token
            return res
                .cookie("token", response.token, options)
                .status(StatusCodes.OK)
                .json({
                    success: true,
                    data: {
                        token: response.token,
                        user: response.user,
                    },
                    message: `User Login Success`,
                });
        } catch (error) {
            // Handling errors
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }

    async sendOtp(req, res) {
        try {
            const { email } = req.body;

            // Check if email is empty
            if (!email) {
                errorObj.message = "Email is required";
                errorObj.success = false;
                return res.status(StatusCodes.FORBIDDEN).json(errorObj);
            }

            // Calling user-service for sending otp
            const response = await userService.sendOtp(email);

            successObj.message = "OTP Created successfully";
            successObj.data = response;
            return res.status(StatusCodes.OK).json(successObj);
        } catch (error) {
            // Handle error
            errorObj.message = error.message;
            errorObj.err = error;

            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorObj);
        }
    }
}

export default AuthController;
