import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { HealthzObject } from "./def.ts";
import { logger } from "./main.ts";
export class StatisticsService {

    numberOfRequests = 0;
    averageTime = 0;
    startTime: number = Date.now();
    endTime: number = Date.now();

    constructor(app: Application) {
        logger.info("Constructing Stats");
        app.use(async (_ctx, next) => {
            this.numberOfRequests++;
            this.startTime = Date.now();

            await next();
        });
    }

    initialize(app: Application) {
        logger.info("Initializing Stats");
        app.use(async (_ctx, next) => {
            this.endTime = Date.now();
            const time = this.endTime - this.startTime;
            this.averageTime += time;

            await next();
        });
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