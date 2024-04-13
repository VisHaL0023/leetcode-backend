import { connect as _connect } from "mongoose";
import ServerConfig from "./server-config.js";

async function connect() {
    await _connect(ServerConfig.DB_URI);
}

export default { connect };
