import axios from "axios";

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
}

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