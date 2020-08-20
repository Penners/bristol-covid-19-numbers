const { zonedTimeToUtc, utcToZonedTime, format } = require("date-fns-tz");

const parseData = (response) => {
    let totalDataSet = [];

    let totalCases = 0;

    for (let i = 0; i < response.data.length; i++){
        let element = response.data[i];

        totalDataSet.push(
            {
                dateFormat: format(new Date(element.date), "dd/MM/yyyy"),
                date: element.date,
                totalCases: element.cumCasesBySpecimenDate,
                dailyCases: element.newCasesBySpecimenDate,
                assumedData: false
            }
        )
    }

    


    return {
        metaData: {
            lastUpdatedAt: (response.data[0] && response.data[0].date) ? new Date(response.data[0].date) : new Date(),
        },
        newCasesToday: (response.data[0] && response.data[0].newCasesBySpecimenDate) ? response.data[0].newCasesBySpecimenDate : 0,
        newCasesYesterday: 0,
        totalCases: (response.data[0] && response.data[0].cumCasesBySpecimenDate) ? response.data[0].cumCasesBySpecimenDate : 0,
        daysSinceLastCase: 0,
        totalDataSet: totalDataSet
    }
}

export default parseData; 