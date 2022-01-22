/*
    Mohfw stores the data in a pdf file whose name is based on the previous day
    So if current day is: 21 Jan 2022
    The pdf name would be: "CummulativeCovidVaccinationReport20January2022.pdf"

    Route to request: /pdf/CummulativeCovidVaccinationReport20January2022.pdf

    TODO:
    Download the pdf file with axios, and parse the required data. Delete the downloaded file.
*/

import fs from "fs";
import axios from "axios";
import monthLookup from "../utils/monthLookup";

import PDFparser from "pdf2json";
const pdfparse = new PDFparser(this, 1);

// to be downloaded
let filename:string = "VaccineData.pdf"


/*
    Construct the URL from timezone
*/
const constructURL = ():string => {
    let baseURL:string = "https://www.mohfw.gov.in/pdf/CummulativeCovidVaccinationReport";
    let newURL:string = "";

    // get date
    let dt:Date = new Date();
    let month:string = monthLookup[dt.getMonth()];
    let day:string = (dt.getDate() - 1).toString();     // previous day
    let year:string = dt.getFullYear().toString();

    // got it!
    newURL = baseURL + day + month + year + ".pdf";
    return newURL;
}

/*
    Download the pdf and parse it
*/
const downloadPDF = () => {
    // create instance and construct url
    const axinst = axios.create();
    let URL:string = constructURL();


    // this will download the file
    axinst.get(URL, {
        responseType: "stream"
    })
    .then(resp => {
        // write it to a file
        resp.data.pipe(fs.createWriteStream(filename));
    })
    .catch(e => {
        console.error("Oops! An error occurred while fetching the vaccine data...");
        console.error(e);
    });
}

/*
    Parse the vaccine data from pdf
*/
const getVaccineData = (asJSONString=false) => {
    // if download fails, stop there!
    try {
        downloadPDF();
    } catch (err) {
        console.error(err);
    }

    // the file is downloaded, parse it now
    pdfparse.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfparse.on("pdfParser_dataReady", pdfData => {

        let strContent = pdfparse.getRawTextContent();

        strContent = strContent.split("\r\n")

        console.log(strContent);
    });

    pdfparse.loadPDF(filename);
}

export default {
    constructURL,
    getVaccineData
}