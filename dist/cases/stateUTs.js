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
const axios_1 = __importDefault(require("axios"));
;
/*
    Get the cases of all states and UTs
*/
const abbrLookup = {
    "AN": ["Andaman and Nicobar Islands", "A & N Islands"],
    "AP": "Andhra Pradesh",
    "AR": "Arunachal Pradesh",
    "AS": "Assam",
    "BR": "Bihar",
    "CH": "Chandigarh",
    "CT": "Chhattisgarh",
    "DN": ["Dadra and Nagar Haveli", "Dadra & Nagar Haveli"],
    "DD": ["Daman and Diu", "Daman & Diu"],
    "DL": "Delhi",
    "GA": "Goa",
    "GJ": "Gujarat",
    "HR": "Haryana",
    "HP": "Himachal Pradesh",
    "JK": ["Jammu and Kashmir", "Jammu & Kashmir"],
    "JH": "Jharkhand",
    "KA": "Karnataka",
    "KL": "Kerala",
    "LD": "Lakshadweep",
    "LA": "Ladakh",
    "MP": "Madhya Pradesh",
    "MH": "Maharashtra",
    "MN": "Manipur",
    "ML": "Meghalaya",
    "MZ": "Mizoram",
    "NL": "Nagaland",
    "OR": "Odisha",
    "PY": "Puducherry",
    "PB": "Punjab",
    "RJ": "Rajasthan",
    "SK": "Sikkim",
    "TN": "Tamil Nadu",
    "TG": "Telangana",
    "TR": "Tripura",
    "UP": "Uttar Pradesh",
    "UT": "Uttarakhand",
    "WB": "West Bengal",
};
// found the file at /data/datanew.json
const getCasesStateUTs = (URL) => __awaiter(void 0, void 0, void 0, function* () {
    const axinst = axios_1.default.create();
    let coviddataStateUT = [];
    // fetch
    try {
        let newURL = URL + "data/datanew.json";
        let response = yield axinst.get(newURL);
        let dataNewStateUTs = yield response.data;
        // set the correct abbreviation from the lookup table
        for (let dataObj of dataNewStateUTs) {
            let abbr = "";
            if (dataObj["state_name"] === "") {
                abbr = "All over India";
                dataObj["sno"] = "0";
            }
            for (let key in abbrLookup) {
                // when the value is an array of possible state names
                if (typeof abbrLookup[key] !== "string") {
                    for (let sname of abbrLookup[key]) {
                        if (sname === dataObj["state_name"]) {
                            abbr += key;
                        }
                    }
                }
                else {
                    let sname = dataObj["state_name"];
                    // for Kerala***
                    if (sname[sname.length - 1] === '*') {
                        sname = sname.slice(0, -3);
                        dataObj["state_name"] = sname;
                    }
                    // set the abbr to key
                    if (sname === abbrLookup[key]) {
                        abbr += key;
                    }
                }
            }
            dataObj["abbr"] = abbr;
            // get timestamp
            let nowDate = new Date();
            dataObj["Timestamp"] = nowDate.toString();
            dataObj["UnixTimestamp"] = Math.floor(nowDate.getTime() / 1000);
        }
        coviddataStateUT.push(dataNewStateUTs);
        return coviddataStateUT;
    }
    catch (err) {
        console.log("Oops! Some error occurred...");
        console.error(err.message);
    }
});
exports.default = {
    getCasesStateUTs
};
//# sourceMappingURL=stateUTs.js.map