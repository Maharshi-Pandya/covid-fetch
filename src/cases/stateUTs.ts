import axios from "axios";
import abbrLookup from "../utils/abbrLookup";

// state data structure
interface IStateUTData {
    sno:number,
    state_name:string,
    abbr:string,
    active:number,
    positive:number,
    cured:number,
    death:number,
    new_active:number,
    new_positive:number,
    new_cured:number,
    new_death:number,
    state_code:string,

    Timestamp:string,
    UnixTimestamp:number,
};

/*
    Get the cases of all states and UTs
*/

// found the file at /data/datanew.json
const getCasesStateUTs = async (URL:string) => {
    const axinst = axios.create();
    let coviddataStateUT:IStateUTData[] = [];

    // fetch
    try {
        let newURL:string = URL + "data/datanew.json";
        let response = await axinst.get(newURL)
        let dataNewStateUTs = await response.data;
        
        // set the correct abbreviation from the lookup table
        for(let dataObj of dataNewStateUTs) {
            let abbr:string = "";

            if(dataObj["state_name"] === "") {
                abbr = "All over India";
                dataObj["sno"] = "0";
            }

            for(let key in abbrLookup) {
                // when the value is an array of possible state names
                if(typeof abbrLookup[key] !== "string") {
                    for(let sname of abbrLookup[key]) {
                        if(sname === dataObj["state_name"]) {
                            abbr += key;
                        }
                    }
                }
                else {
                    let sname:string = dataObj["state_name"];
                    // for Kerala***
                    if(sname[sname.length - 1] === '*') {
                        sname = sname.slice(0, -3);
                        dataObj["state_name"] = sname;
                    }

                    // set the abbr to key
                    if(sname === abbrLookup[key]) {
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

        coviddataStateUT.push(dataNewStateUTs, );
        return coviddataStateUT;
    } catch (err) {
        console.log("Oops! Some error occurred...");
        console.error(err.message);
    }
}

export default {
    getCasesStateUTs
}