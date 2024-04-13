import dotenv from "dotenv";
import * as process from "process";
import logger from "./middlewares/logger";
import App from "./app";
import cors from "cors";
import { UserRoute } from "./routes/user.route";

dotenv.config();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    require('module-alias/register');
}



const allowedOrigins = ['http://localhost:5173', 'http://164.92.195.79', 'http://192.168.100.2:5173'];

const app = new App({
    port: 8000,
    middlewares: [
        logger(),
        cors({
            origin: function (origin, callback) {
                const isAllowed = !origin || allowedOrigins.includes(origin);
                callback(null, isAllowed);
            },
            credentials: true,
        })
    ],
    routes: [
        new UserRoute(), 
    ],
});

app.listen();

