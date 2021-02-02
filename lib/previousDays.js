const previousDays = (dataSet, numDays) => {
    let past7DayCases = 0;
    for (let i = 0; i < numDays; i++){
        past7DayCases += dataSet[i].newCasesBySpecimenDate
    }
    return past7DayCases
}

export default previousDays