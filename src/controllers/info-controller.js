import { StatusCodes } from "http-status-codes";

const info = (req, res) => {
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "API is live",
        error: {},
        data: {},
    });
};

export default {
    info,
};
