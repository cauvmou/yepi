import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { HealthzObject } from "./def.ts";
export class StatisticsService {

    numberOfRequests = 0;
    averageTime = 0;
    startTime: number = Date.now();
    endTime: number = Date.now();

    constructor(app: Application) {
        console.log("Constructing Stats");
        app.use(async (_ctx, next) => {
            this.numberOfRequests++;
            this.startTime = Date.now();

            await next();
        });
        console.log("Finished Constructing Stats");
    }

    initialize(app: Application) {
        console.log("Initializing Stats");
        app.use(async (_ctx, next) => {
            this.endTime = Date.now();
            const time = this.endTime - this.startTime;
            this.averageTime += time;

            await next();
        });

        console.log("Finished Initializing Stats");
    }

    generate(): HealthzObject {

        return {
            InstanceOfRequests: this.numberOfRequests,
            AverageTime: `${(this.averageTime/this.numberOfRequests).toFixed(2)}ms`,
            TimeSpent: `${(Math.abs(this.endTime - this.startTime)).toFixed(2)}ms`,
        }
    }

    route(router: Router) {
        router.get('/api/health', (context) => {
            context.response.body = this.generate();
        });
    }

}