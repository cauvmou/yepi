import "https://raw.githubusercontent.com/daychongyang/dotenv/master/load.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { StatisticsService } from "./statistics.ts";
import Logger from "https://deno.land/x/logger@v1.0.2/logger.ts";
import { loadData } from "./loader.ts"

export const logger = new Logger();

const app = new Application();
const router = new Router();
const testData = await loadData();
const stats = new StatisticsService(app);

const PORT = Number.parseInt(Deno.env.get("DEV_PORT") || "80", 10);

router.get('/api/random', (context) => {
    const index = Math.floor(Math.random() * testData.length);
    context.response.body = testData[index];
});


stats.initialize(app);
stats.route(router);
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: PORT });

