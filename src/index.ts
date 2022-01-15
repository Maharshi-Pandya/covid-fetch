/*
    Scrape the covid data (India, States and UTs) from
    https://www.mohfw.gov.in/
*/

import cases from "./cases";

cases.getCasesDataIndia()
.then(data => console.log(data))

cases.getCasesDataState()
.then(data => console.log(data))