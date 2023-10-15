import "dotenv/config";

import morgan from "morgan";
import express, { Application, Request, Response } from "express";

import Constants from "./constants.js";
import authRouter from "./services/auth/auth-router.js";
import userRouter from "./services/user/user-router.js";
import eventRouter from "./services/event/event-router.js";
import profileRouter from "./services/profile/profile-router.js";
import newsletterRouter from "./services/newsletter/newsletter-router.js";
import versionRouter from "./services/version/version-router.js";

import { InitializeConfigReader } from "./middleware/config-reader.js";

const app: Application = express();

// Utility packages (detailed in the readme)
// app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(InitializeConfigReader);
app.use(morgan("dev"));

app.use(express.json());

// Add routers for each sub-service
app.use("/auth/", authRouter);
app.use("/user/", userRouter);
app.use("/newsletter/", newsletterRouter);
app.use("/event/", eventRouter);
app.use("/profile/", profileRouter);
app.use("/version/", versionRouter);

// Ensure that API is running
app.get("/", (_: Request, res: Response) => {
    res.end("API is working!!!");
});

// Throw an error if call is made to the wrong API endpoint
app.use("/", (_: Request, res: Response) => {
    res.status(Constants.NOT_FOUND).end("API endpoint does not exist!");
});

export function startServer(): Promise<Express.Application> {
    // eslint-disable-next-line no-magic-numbers
    const port = process.env.PORT || 3000;

    return new Promise((resolve) => {
        const server = app.listen(port, () => {
            console.log(`✅ Server served on http://localhost:${port}...`);
            resolve(server);
        });
    });
}

export default app;