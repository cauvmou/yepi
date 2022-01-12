"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("https://raw.githubusercontent.com/daychongyang/dotenv/master/load.ts");
var mod_ts_1 = require("https://deno.land/x/oak/mod.ts");
var statistics_ts_1 = require("./statistics.ts");
var app = new mod_ts_1.Application();
var router = new mod_ts_1.Router();
var testData = await loadTestingData();
var stats = new statistics_ts_1.StatisticsService(app);
var PORT = Number.parseInt(Deno.env.get("DEV_PORT") || "80", 10);
router.get('/api/random', function (context) {
    var index = Math.floor(Math.random() * testData.length);
    context.response.body = testData[index];
});
stats.initialize(app);
stats.route(router);
app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: PORT });
function loadTestingData() {
    return __awaiter(this, void 0, Promise, function () {
        var text, raw, parsed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Deno.readTextFile(Deno.cwd().concat("/src/testing/test.json"))];
                case 1:
                    text = _a.sent();
                    raw = JSON.parse(text);
                    parsed = [];
                    raw.forEach(function (e) {
                        console.log(e.date);
                        parsed.push({
                            quote: e.quote,
                            source: e.source,
                            metadata: e.metadata,
                            date: new Date(e.date)
                        });
                    });
                    return [2 /*return*/, parsed];
            }
        });
    });
}
