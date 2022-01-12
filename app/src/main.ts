import "https://raw.githubusercontent.com/daychongyang/dotenv/master/load.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { CommonCSVReaderOptions, readCSV } from "https://deno.land/x/csv/mod.ts";
import { Metadata, QuoteData } from "./def.ts";
import { StatisticsService } from "./statistics.ts";

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

async function loadData(): Promise<QuoteData[]> {
    const parsed: QuoteData[] = [];

    const f = await Deno.open(Deno.cwd().concat("/data/quotes.csv"));

    
    const options: Partial<CommonCSVReaderOptions> = {
        columnSeparator: ";",
        lineSeparator: "\r\n",
        quote: "$",
    };

    for await (const row of readCSV(f, options)) {
        const blob = []
        for await (const cell of row) {
            blob.push(cell)
        }
        const rawDate = blob[0].split(".")
        const date = new Date(`${rawDate[1]} ${rawDate[0]} ${rawDate[2]}`)
        const metadata: Metadata = {
            album: blob[4] ? blob[4] : undefined,
            songName: blob[3] ? blob[3] : undefined,
            specificSource: blob[5] ? blob[5] : undefined,
        }
        parsed.push({
            date,
            quote: blob[1],
            source: blob[2],
            metadata: blob[3] || blob[4] || blob[5] ? metadata : undefined,
        })
    }

    f.close();
    return parsed;
}