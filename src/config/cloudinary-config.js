import { v2 as cloudinary } from "cloudinary";
import ServerConfig from "./server-config.js";

async function connect() {
    try {
        cloudinary.config({
            cloud_name: ServerConfig.CLOUDINARY_NAME,
            api_key: ServerConfig.CLOUDINARY_API_KEY,
            api_secret: ServerConfig.CLOUDINARY_SECRET_KEY,
        });
        console.log("Cloudinary connected");
    } catch (error) {
        console.log("Error connecting " + error);
    }
}

export default { connect };
