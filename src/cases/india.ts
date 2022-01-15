// data all over india
import axios from "axios";
import cheerio from "cheerio";

// data structure
interface ICovidDataIndia {
    Active:number,
    ActivePercent:number,
    Deaths:number
    DeathPercent: number,
    Discharged:number,
    DischargePercent:number,

    // change since yesterday
    ActiveChange:number,
    DeathChange:number,
    DischargeChange:number

    TotalVaccination:number,
    VaccineChange:number,

    Timestamp:string,
    UnixTimestamp:number,
};

// scrape and save in json file
const getCasesIndia = async (URL:string) => {
    const axinst = axios.create();
    // data to send
    let covid19DataIndia:ICovidDataIndia[] = [];

    try {
        let response = await axinst.get(URL);
        const mohfwHtml = response.data;

        // got the html, load cheerio
        const $ = cheerio.load(mohfwHtml);
        const siteStatsCount = $(".site-stats-count > ul");
        const vaccineStat = $(".sitetotal > .fullbol");

        // 1) Active cases
        let activeStat:string = $(siteStatsCount).find(".bg-blue > .mob-hide").text();
        let activeStatIcon = $(siteStatsCount).find(".bg-blue > .mob-hide > span > i").attr();
        let activeChangeSign:number = activeStatIcon.class.slice(12) == "up" ? 1 : -1;
                
        activeStat = activeStat.split(" ")[1];

        // use regex to get the nums
        let matches = activeStat.match(/\d+/g);
        let activeNum:number, activeChange:number;
        if(matches) {
            activeNum = parseInt(matches[0]);
            activeChange = parseInt(matches[1]) * activeChangeSign;
        }

        // console.log("\n\nActive cases:", activeNum);
        // console.log("Change since yesterday:", activeChange);

        // 2) Discharged
        let dischargeStat:string = $(siteStatsCount).find(".bg-green > .mob-hide").text();
        let dischargeStatIcon = $(siteStatsCount).find(".bg-green > .mob-hide > span > i").attr();
        let dischargeChangeSign:number = dischargeStatIcon.class.slice(12) == "up" ? 1 : -1;
                
        dischargeStat = dischargeStat.split(" ")[1];

        // use regex to get the nums
        matches = dischargeStat.match(/\d+/g);
        let dischargeNum:number, dischargeChange:number;
        if(matches) {
            dischargeNum = parseInt(matches[0]);
            dischargeChange = parseInt(matches[1]) * dischargeChangeSign;
        }

        // console.log("\n\nDischarged cases:", dischargeNum);
        // console.log("Change since yesterday:", dischargeChange);

        // 3) Deaths
        let deathStat:string = $(siteStatsCount).find(".bg-red > .mob-hide").text();
        let deathStatIcon = $(siteStatsCount).find(".bg-red > .mob-hide > span > i").attr();
        let deathChangeSign:number = deathStatIcon.class.slice(12) == "up" ? 1 : -1;
                
        deathStat = deathStat.split(" ")[1];

        // use regex to get the nums
        matches = deathStat.match(/\d+/g);
        let deathNum:number, deathChange:number;
        if(matches) {
            deathNum = parseInt(matches[0]);
            deathChange = parseInt(matches[1]) * deathChangeSign;
        }

        // console.log("\n\nDeath cases:", deathNum);
        // console.log("Change since yesterday:", deathChange);

        // Vaccination
        let vaccineStr:string = $(vaccineStat).find(".coviddata").text();
        let vaccineChangeStr:string = $(vaccineStat).find(".coviddataval").text();
        let vaccineChangeSign = $(vaccineStat).find(".coviddataval > i").attr();

        let vaccineNum:number = parseInt(vaccineStr.replace(/\,/g, ""));
        let vaccineChangeSignNum:number = vaccineChangeSign.class.slice(12) == "up" ? 1 : -1;
        let vaccineChange:number = vaccineChangeSignNum * parseInt(vaccineChangeStr.replace(/[\,\(]/g, ""));

        // console.log("Total vaccinations:", vaccineNum);
        // console.log("Change since yesterday:", vaccineChange);

        // Calculate percent
        let totalStat:number = activeNum + dischargeNum + deathNum;
        let activePercent:number = parseFloat(((activeNum / totalStat) * 100).toPrecision(5));
        let dischargePercent:number = parseFloat(((dischargeNum / totalStat) * 100).toPrecision(5));
        let deathPercent:number = parseFloat(((deathNum / totalStat) * 100).toPrecision(5));

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
    } catch (err) {
        console.error("Oops! Some error occurred...");
        console.error(err.message);
    }
}

export default {
   getCasesIndia
};