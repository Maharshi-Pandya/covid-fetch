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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// data all over india
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
;
// scrape and save in json file
const getCasesIndia = (URL) => __awaiter(void 0, void 0, void 0, function* () {
    const axinst = axios_1.default.create();
    // data to send
    let covid19DataIndia = [];
    try {
        let response = yield axinst.get(URL);
        const mohfwHtml = response.data;
        // got the html, load cheerio
        const $ = cheerio_1.default.load(mohfwHtml);
        const siteStatsCount = $(".site-stats-count > ul");
        const vaccineStat = $(".sitetotal > .fullbol");
        // 1) Active cases
        let activeStat = $(siteStatsCount).find(".bg-blue > .mob-hide").text();
        let activeStatIcon = $(siteStatsCount).find(".bg-blue > .mob-hide > span > i").attr();
        let activeChangeSign = activeStatIcon.class.slice(12) == "up" ? 1 : -1;
        activeStat = activeStat.split(" ")[1];
        // use regex to get the nums
        let matches = activeStat.match(/\d+/g);
        let activeNum, activeChange;
        if (matches) {
            activeNum = parseInt(matches[0]);
            activeChange = parseInt(matches[1]) * activeChangeSign;
        }
        // console.log("\n\nActive cases:", activeNum);
        // console.log("Change since yesterday:", activeChange);
        // 2) Discharged
        let dischargeStat = $(siteStatsCount).find(".bg-green > .mob-hide").text();
        let dischargeStatIcon = $(siteStatsCount).find(".bg-green > .mob-hide > span > i").attr();
        let dischargeChangeSign = dischargeStatIcon.class.slice(12) == "up" ? 1 : -1;
        dischargeStat = dischargeStat.split(" ")[1];
        // use regex to get the nums
        matches = dischargeStat.match(/\d+/g);
        let dischargeNum, dischargeChange;
        if (matches) {
            dischargeNum = parseInt(matches[0]);
            dischargeChange = parseInt(matches[1]) * dischargeChangeSign;
        }
        // console.log("\n\nDischarged cases:", dischargeNum);
        // console.log("Change since yesterday:", dischargeChange);
        // 3) Deaths
        let deathStat = $(siteStatsCount).find(".bg-red > .mob-hide").text();
        let deathStatIcon = $(siteStatsCount).find(".bg-red > .mob-hide > span > i").attr();
        let deathChangeSign = deathStatIcon.class.slice(12) == "up" ? 1 : -1;
        deathStat = deathStat.split(" ")[1];
        // use regex to get the nums
        matches = deathStat.match(/\d+/g);
        let deathNum, deathChange;
        if (matches) {
            deathNum = parseInt(matches[0]);
            deathChange = parseInt(matches[1]) * deathChangeSign;
        }
        // console.log("\n\nDeath cases:", deathNum);
        // console.log("Change since yesterday:", deathChange);
        // Vaccination
        let vaccineStr = $(vaccineStat).find(".coviddata").text();
        let vaccineChangeStr = $(vaccineStat).find(".coviddataval").text();
        let vaccineChangeSign = $(vaccineStat).find(".coviddataval > i").attr();
        let vaccineNum = parseInt(vaccineStr.replace(/\,/g, ""));
        let vaccineChangeSignNum = vaccineChangeSign.class.slice(12) == "up" ? 1 : -1;
        let vaccineChange = vaccineChangeSignNum * parseInt(vaccineChangeStr.replace(/[\,\(]/g, ""));
        // console.log("Total vaccinations:", vaccineNum);
        // console.log("Change since yesterday:", vaccineChange);
        // Calculate percent
        let totalStat = activeNum + dischargeNum + deathNum;
        let activePercent = parseFloat(((activeNum / totalStat) * 100).toPrecision(5));
        let dischargePercent = parseFloat(((dischargeNum / totalStat) * 100).toPrecision(5));
        let deathPercent = parseFloat(((deathNum / totalStat) * 100).toPrecision(5));
        // console.log("Active Percent:", activePercent);
        // console.log("Discharged Percent:", dischargePercent);
        // console.log("Death Percent:", deathPercent);
        let nowDate = new Date();
        // Put in the values
        covid19DataIndia.push({
            Active: activeNum,
            ActivePercent: activePercent,
            Deaths: deathNum,
            DeathPercent: deathPercent,
            Discharged: dischargeNum,
            DischargePercent: dischargePercent,
            ActiveChange: activeChange,
            DeathChange: deathChange,
            DischargeChange: dischargeChange,
            TotalVaccination: vaccineNum,
            VaccineChange: vaccineChange,
            Timestamp: nowDate.toString(),
            UnixTimestamp: Math.floor(nowDate.getTime() / 1000),
        });
        // send the data
        return covid19DataIndia;
    }
    catch (err) {
        console.error("Oops! Some error occurred...");
        console.error(err.message);
    }
});
exports.default = {
    getCasesIndia
};
//# sourceMappingURL=india.js.map