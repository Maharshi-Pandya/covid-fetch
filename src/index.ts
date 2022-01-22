/*
    Scrape the covid data (India, States and UTs) from
    https://www.mohfw.gov.in/
*/

import cases from "./cases";
import vaccination from "./vaccination";

console.log(vaccination.stateUTs.constructURL());
vaccination.stateUTs.getVaccineData();

export default {
    cases
}