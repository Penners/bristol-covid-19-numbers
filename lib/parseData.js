const get = require("lodash.get");
const { zonedTimeToUtc, utcToZonedTime, format } = require("date-fns-tz");
const tz = "Europe/London";
import fillEmptyDates from "../lib/fillEmptyDates";

const parseData = (response) => {
  if (response.E06000023 && response.metadata) {
    const todayDate = new Date();
    // const todayDate = zonedTimeToUtc("2020-05-01");
    const yesterdayDate = todayDate - 60 * 60 * 24 * 1000;
    let yesterdayCases = 0;
    let newCases = 0;
    let lastCaseDate = false;

    let totalDataSet = [];

    response.E06000023.dailyTotalConfirmedCases.forEach((element) => {
      let key = element.date;

      let dailyCases = response.E06000023.dailyConfirmedCases.find(
        ({ date }) => date === key
      );

      let temp = {
        dateFormat: format(zonedTimeToUtc(key, tz), "dd/MM/yyyy"),
        date: key,
        totalCases: element.value,
        dailyCases: dailyCases.value,
      };

      totalDataSet.push(temp);
    });

    for (
      var i = response.E06000023.dailyConfirmedCases.length - 1;
      i >= 0;
      i--
    ) {
      if (
        format(todayDate, "yyyy-MM-dd") ===
        format(
          zonedTimeToUtc(response.E06000023.dailyConfirmedCases[i].date, tz),
          "yyyy-MM-dd"
        )
      ) {
        newCases = response.E06000023.dailyConfirmedCases[i].value;
      }
      if (
        format(yesterdayDate, "yyyy-MM-dd") ===
        format(
          zonedTimeToUtc(response.E06000023.dailyConfirmedCases[i].date, tz),
          "yyyy-MM-dd"
        )
      ) {
        yesterdayCases = response.E06000023.dailyConfirmedCases[i].value;
      }
      if (
        response.E06000023.dailyConfirmedCases[i].value > 0 &&
        !lastCaseDate
      ) {
        lastCaseDate = zonedTimeToUtc(
          response.E06000023.dailyConfirmedCases[i].date,
          tz
        );
      }
    }

    let returnObj = {
      metaData: response.metadata,
      newCasesToday: newCases,
      newCasesYesterday: yesterdayCases,
      totalCases: get(response, "E06000023.totalCases.value", 0),
      daysSinceLastCase: Math.floor(
        (todayDate - lastCaseDate) / (60 * 60 * 24 * 1000)
      ),
      totalDataSet: fillEmptyDates(totalDataSet).reverse(),
    };

    return returnObj;
  } else {
    return { message: "error parsing data" };
  }
};

export default parseData;
