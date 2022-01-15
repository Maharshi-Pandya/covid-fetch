import india from "./india";
import state from "./stateUTs";

const URL = "https://www.mohfw.gov.in/";

/*
    Get the data on Covid cases and vaccination 
    overall India
*/
const getCasesDataIndia = async (asJSONString:boolean = false) => {
    let casesData = await india.getCasesIndia(URL);

    // check if data is to be sent as JSON string
    if(asJSONString) {
        return JSON.stringify(casesData);
    }

    return casesData;
}

/*
    Get the data on Covid cases for each state
*/
const getCasesDataState = async (asJSONString:boolean = false) => {
    let casesData = await state.getCasesStateUTs(URL);

    // check if data is to be sent as JSON string
    if(asJSONString) {
        return JSON.stringify(casesData);
    }

    return casesData;
}

export default {
    getCasesDataIndia,
    getCasesDataState
}