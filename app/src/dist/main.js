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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
require("https://raw.githubusercontent.com/daychongyang/dotenv/master/load.ts");
var mod_ts_1 = require("https://deno.land/x/oak/mod.ts");
var mod_ts_2 = require("https://deno.land/x/csv/mod.ts");
var statistics_ts_1 = require("./statistics.ts");
var app = new mod_ts_1.Application();
var router = new mod_ts_1.Router();
var testData = await loadData();
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
function loadData() {
    var e_1, _a, e_2, _b;
    return __awaiter(this, void 0, Promise, function () {
        var parsed, f, options, _c, _d, row, blob, row_1, row_1_1, cell, e_2_1, rawDate, date, metadata, e_1_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    parsed = [];
                    return [4 /*yield*/, Deno.open(Deno.cwd().concat("/data/quotes.csv"))];
                case 1:
                    f = _e.sent();
                    options = {
                        columnSeparator: ";",
                        lineSeparator: "\r\n",
                        quote: "$"
                    };
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 19, 20, 25]);
                    _c = __asyncValues(mod_ts_2.readCSV(f, options));
                    _e.label = 3;
                case 3: return [4 /*yield*/, _c.next()];
                case 4:
                    if (!(_d = _e.sent(), !_d.done)) return [3 /*break*/, 18];
                    row = _d.value;
                    blob = [];
                    _e.label = 5;
                case 5:
                    _e.trys.push([5, 10, 11, 16]);
                    row_1 = (e_2 = void 0, __asyncValues(row));
                    _e.label = 6;
                case 6: return [4 /*yield*/, row_1.next()];
                case 7:
                    if (!(row_1_1 = _e.sent(), !row_1_1.done)) return [3 /*break*/, 9];
                    cell = row_1_1.value;
                    blob.push(cell);
                    _e.label = 8;
                case 8: return [3 /*break*/, 6];
                case 9: return [3 /*break*/, 16];
                case 10:
                    e_2_1 = _e.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 16];
                case 11:
                    _e.trys.push([11, , 14, 15]);
                    if (!(row_1_1 && !row_1_1.done && (_b = row_1["return"]))) return [3 /*break*/, 13];
                    return [4 /*yield*/, _b.call(row_1)];
                case 12:
                    _e.sent();
                    _e.label = 13;
                case 13: return [3 /*break*/, 15];
                case 14:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 15: return [7 /*endfinally*/];
                case 16:
                    rawDate = blob[0].split(".");
                    date = new Date(rawDate[1] + " " + rawDate[0] + " " + rawDate[2]);
                    metadata = {
                        album: blob[4] ? blob[4] : undefined,
                        songName: blob[3] ? blob[3] : undefined,
                        specificSource: blob[5] ? blob[5] : undefined
                    };
                    parsed.push({
                        date: date,
                        quote: blob[1],
                        source: blob[2],
                        metadata: blob[3] || blob[4] || blob[5] ? metadata : undefined
                    });
                    _e.label = 17;
                case 17: return [3 /*break*/, 3];
                case 18: return [3 /*break*/, 25];
                case 19:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 25];
                case 20:
                    _e.trys.push([20, , 23, 24]);
                    if (!(_d && !_d.done && (_a = _c["return"]))) return [3 /*break*/, 22];
                    return [4 /*yield*/, _a.call(_c)];
                case 21:
                    _e.sent();
                    _e.label = 22;
                case 22: return [3 /*break*/, 24];
                case 23:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 24: return [7 /*endfinally*/];
                case 25:
                    f.close();
                    return [2 /*return*/, parsed];
            }
        });
    });
}
