import "https://raw.githubusercontent.com/daychongyang/dotenv/master/load.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";
import { QuoteData, QuoteDataRaw } from "./def.ts";
import { StatisticsService } from "./statistics.ts";

const app = new Application();
const router = new Router();
const testData = await loadTestingData();
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

async function loadTestingData(): Promise<QuoteData[]> {
    const text = await Deno.readTextFile(Deno.cwd().concat("/src/testing/test.json"));
    const raw: QuoteDataRaw[] = JSON.parse(text);
    const parsed: QuoteData[] = [];
    raw.forEach(e => {
        console.log(e.date)
        parsed.push({
            quote: e.quote,
            source: e.source,
            metadata: e.metadata,
            date: new Date(e.date),
        });
    });
    return parsed;
}