const { zonedTimeToUtc, utcToZonedTime, format } = require("date-fns-tz");
const tz = "Europe/London";
const fillEmptyDates = (array) => {
  const startDate = zonedTimeToUtc(array[0].date, tz);
  const endDate = new Date();

  let range = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

  let dates = [];

  for (let i = 0; i <= range; i++) {
    let timestamp = startDate.getTime() + 1000 * 60 * 60 * 24 * i;
    // console.log(timestamp);
    let date = format(timestamp, "yyyy-MM-dd");
    dates.push(date);
  }

  let filledIn = [];

  dates.forEach((dateElement) => {
    let dayData = array.find((element) => element.date === dateElement);

    if (dayData) {
      filledIn.push(dayData);
    } else {
      filledIn.push({
        dateFormat: format(utcToZonedTime(dateElement, tz), "dd/MM/yyyy"),
        date: dateElement,
        totalCases: null,
        dailyCases: 0,
        assumedData: true,
      });
    }
  });

  dates = null;
  array = null;

  let knownCount = 0;
  // now fill in totals on undefined day with previous known count
  filledIn.forEach((value, index) => {
    if (value.totalCases !== null) {
      knownCount = value.totalCases;
    } else {
      filledIn[index].totalCases = knownCount;
    }
  });

  return filledIn;
};

export default fillEmptyDates;
