import { app } from "../server/index";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

let initialized = false;

export default async (req: any, res: any) => {
    if (!initialized) {
        const httpServer = createServer(app);
        await registerRoutes(httpServer, app);
        initialized = true;
    }
    return app(req, res);
};
