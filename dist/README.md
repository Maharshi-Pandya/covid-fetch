# Covid Fetch

![npm (scoped)](https://img.shields.io/npm/v/@yy3301/covid-fetch)
![npm bundle size](https://img.shields.io/bundlephobia/min/covid-fetch?color=green)

A simple package (i.e. a _fetcher_) for India's COVID-19 data fetched from the Government sources online.

Use this instead of scraping the Government websites from scratch. Collect the data into a usable format (like `JSON`).

- Data fetched is the same as shown on the MoHFW website.
- Data is provided in a more effective format and can be converted into other formats quickly without any hassle
- Reduce the load on the government facilities c'mon

## Usage

Install the package:

```shell
$ npm i covid-fetch
```

To use this:

```javascript
const cf = require("covid-fetch").default;

cf.cases.getCasesDataState()
.then(stateData => {
    console.log(stateData);
});
```

Passing the argument `true` to the function results in getting back a `JSON` string:

```javascript
cf.cases.getCasesDataIndia(true)
.then(dataIndia => {
    console.log(dataIndia);
});
```

## Structure of the Data

For India:

```yaml
[
    {
        Active: number,
        ActivePercent: number,
        Deaths: number,
        DeathPercent: number,
        Discharged: number,
        DischargePercent: number,
        ActiveChange: number,
        DeathChange: number,
        DischargeChange: number,
        TotalVaccination: number,
        VaccineChange: number,
        Timestamp: string,
        UnixTimestamp: number
    }
]
```

**Documentation for India:**

- **Active**: The number of active cases all over India
- **ActivePercent**: Percentage of active cases
- **Deaths**: The number of deaths all over India
- **DeathPercent**: Percentage of deaths
- **Discharged**: The number of cured cases all over India
- **DischargePercent**: Percentage of discharged cases
- **ActiveChange**, **DeathChange**, DischargeChange**: Change in the number of active, death or discharged cases since yesterday
- **TotalVaccination**: The total number of vaccinations all over india
- **VaccineChange**: Change in the number of vaccinations given since yesterday
- **Timestamp**, **UnixTimestamp**: Timestamp of when the data was fetched


For States and UTs:

```yaml
[
    ...
    {
        sno: string,
        state_name: string,
        active: string,
        positive: string,
        cured: string,
        death: string,
        new_active: string,
        new_positive: string,
        new_cured: string,
        new_death: string,
        death_reconsille: string,
        total: string,
        state_code: string,
        abbr: string,   # abbreviation of the state or UT
        Timestamp: string,
        UnixTimestamp: number
    }
    ...
]
```

**Documentation for States and UTs:**

- **sno**: Sr number (ez)
- **state_name**: Name of the state
- **active**: number of previous active cases in that state
- **positive**: number of previous positive cases in that state
- **cured**: number of cured cases in that state
- **death**: number of deaths in that state
- **new_active**, **new_positive**, **new_cured**, **new_death**: number of new cases in that state respectively
- **death_reconsille**: the number of reconciled deaths in that state
- **total**: total number of deaths after reconcilation
- **state_code**: State code of that state
- **abbr**: Abbreviation of that state
- **Timestamp**, **UnixTimestamp**: Timestamp of when the data was fetched
