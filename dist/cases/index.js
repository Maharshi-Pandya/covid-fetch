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
const india_1 = __importDefault(require("./india"));
const stateUTs_1 = __importDefault(require("./stateUTs"));
const URL = "https://www.mohfw.gov.in/";
/*
    Get the data on Covid cases and vaccination
    overall India
*/
const getCasesDataIndia = (asJSONString = false) => __awaiter(void 0, void 0, void 0, function* () {
    let casesData = yield india_1.default.getCasesIndia(URL);
    // check if data is to be sent as JSON string
    if (asJSONString) {
        return JSON.stringify(casesData);
    }
    return casesData;
});
/*
    Get the data on Covid cases for each state
*/
const getCasesDataState = (asJSONString = false) => __awaiter(void 0, void 0, void 0, function* () {
    let casesData = yield stateUTs_1.default.getCasesStateUTs(URL);
    // check if data is to be sent as JSON string
    if (asJSONString) {
        return JSON.stringify(casesData);
    }
    return casesData;
});
exports.default = {
    getCasesDataIndia,
    getCasesDataState
};
//# sourceMappingURL=index.js.map