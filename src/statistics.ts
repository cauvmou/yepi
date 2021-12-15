import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { HealthzObject } from "./def.ts";
export class StatisticsService {

    numberOfRequests: number = 0;
    avarageTime: number = 0;
    startTime: number = Date.now();
    endTime: number = Date.now();

    constructor(app: Application) {
        console.log("Constructing Stats");
        app.use(async (ctx, next) => {
            this.numberOfRequests++;
            this.startTime = Date.now();

            await next();
        });
        console.log("Finished Constructing Stats");
    }

    initialize(app: Application) {
        console.log("Initialized Stats");
        app.use(async (ctx, next) => {
            this.endTime = Date.now();
            const time = this.endTime - this.startTime;
            this.avarageTime += time;

            await next();
        })

        console.log("Finished Initialized Stats");
    }

    generate(): HealthzObject {

        return {
            InstanceOfRequests: this.numberOfRequests,
            AverageTime: `${(this.avarageTime/this.numberOfRequests).toFixed(2)}ms`,
            TimeSpend: `${(Math.abs(this.endTime - this.startTime)).toFixed(2)}ms`,
        }
    }

    route(router: Router) {
        router.get('/api/health', (context) => {
            context.response.body = this.generate();
        })
    }

}