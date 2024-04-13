import { OTP } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class OTPRepository extends CrudRepository {
    constructor() {
        super(OTP);
    }

    // To get latest OTP
    async findOTP(otp) {
        try {
            const user = await OTP.find(otp).sort({ createdAt: -1 }).limit(1);
            return user;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default OTPRepository;
