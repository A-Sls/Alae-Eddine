import type { Express } from "express";
import type { Server } from "http";
import { createServer as createViteServer, type ViteDevServer } from "vite";
import { log } from "./index";
import path from "path";

export async function setupVite(httpServer: Server, app: Express) {
  const vite: ViteDevServer = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: {
        server: httpServer,
      },
    },
    appType: "spa",
  });

  app.use(vite.middlewares);

  app.use("*", async (_req, res, next) => {
    const url = _req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );

      let template = await import("fs").then((fs) =>
        fs.promises.readFile(clientTemplate, "utf-8")
      );

      template = await vite.transformIndexHtml(url, template);

      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  log("Vite dev server setup complete");
}
