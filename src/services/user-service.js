import {
    UserRepository,
    OTPRepository,
    ProfileRepository,
} from "../repositories/index.js";
import { ServerConfig } from "../config/index.js";

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import otpGenerator from "otp-generator";
import errorObj from "../utils/error-response.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
        this.otpRepository = new OTPRepository();
        this.profileRepository = new ProfileRepository();
    }

    async generateJWT(reqbody) {
        try {
            // checking if user is present
            const user = await this.userRepository.findOne({
                email: reqbody.email,
            });

            // returning token
            return jsonwebtoken.sign(
                { id: user.id, email: user.email },
                ServerConfig.JWT_SECRET_KEY,
                { expiresIn: "7d" }
            );
        } catch (error) {
            console.log(error);
        }
    }

    async signUp(reqbody) {
        try {
            // checking if user is present
            let user = await this.userRepository.findOne({
                email: reqbody.email,
            });
            // if user not present already then we can create user
            if (!user) {
                // Check OTP for the user in OTP model
                const response = await this.otpRepository.findOTP({
                    email: reqbody.email,
                });

                // OTP not found for the email or not equal to otp
                if (response.length === 0 || reqbody.otp !== response[0].otp) {
                    throw {
                        success: false,
                        message: "The OTP is not valid",
                    };
                }

                // Check if user is "Instructor", if yes then he needs to approve else approved
                let approved = "";
                approved =
                    reqbody.accountType === "Instructor"
                        ? (approved = false)
                        : (approved = true);

                // Creating users Profiles
                const profileDetails = await this.profileRepository.create({
                    gender: null,
                    dateOfBirth: null,
                    contactNumber: null,
                    about: null,
                });

                // Creating user
                const user = await this.userRepository.create({
                    firstName: reqbody.firstName,
                    lastName: reqbody.lastName,
                    email: reqbody.email,
                    password: reqbody.password,
                    accountType: reqbody.accountType,
                    approved: approved,
                    profile: profileDetails._id,
                    image: "sample", // TODO: needs to add real image
                });
                return user;
            }
            // Throw error if email already exists
            throw {
                message: "User already exists for given email",
            };
        } catch (error) {
            // Handle error
            console.log("Something went wrong in user service");
            console.log(error);
            throw error;
        }
    }

    async signIn(reqbody) {
        try {
            // checking if user is present
            const user = await this.userRepository.findOne({
                email: reqbody.email,
            });

            if (!user) {
                throw {
                    message: "No user found",
                };
            }

            // Check password with current user
            const isPasswordMatch = await bcrypt.compareSync(
                reqbody.password,
                user.password
            );
            if (!isPasswordMatch) {
                throw {
                    message: "Incorrect password",
                };
            }
            // Generate JWT token for user
            const token = await this.generateJWT(reqbody);

            // Settign password undefined because we need to send user obj to frontend
            user.password = undefined;

            // Set cookie for token and return success response
            return { user, token };
        } catch (error) {
            // Handle error
            console.log(error);
            throw error;
        }
    }

    async sendOtp(email) {
        try {
            // checking if user is present
            const user = await this.userRepository.findOne({ email });

            if (user) {
                throw {
                    message: "User already exists for given email",
                };
            }

            // Generating OTP
            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets: true,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            // Save OTP to database for 5 mints
            const response = await this.otpRepository.create({ email, otp });
            return response;
        } catch (error) {
            // Handle errors
            console.log(error);
            return error;
        }
    }
}

export default UserService;
