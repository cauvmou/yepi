import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { QuoteData } from "./def.ts";
import { StatisticsService } from "./statistics.ts";

const app = new Application();
const router = new Router();
const testData = await loadTestingData();
const stats = new StatisticsService(app);

router.get('/api/random', (context) => {
    const index = Math.floor(Math.random() * testData.length);
    context.response.body = testData[index];
});

app.use(router.routes());
app.use(router.allowedMethods());
stats.initialize(app);
stats.route(router);

await app.listen({ port: 8000 });

async function loadTestingData(): Promise<QuoteData[]> {
    const text = await Deno.readTextFile(Deno.cwd().concat("/src/testing/test.json"));
    console.log(text);
    return JSON.parse(text);
}