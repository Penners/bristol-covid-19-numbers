const getCovidData = async () => {

    const endpoint = "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=Bristol,%2520City%2520of&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22,%22cumCasesBySpecimenDate%22:%22cumCasesBySpecimenDate%22%7D";
    const data = await fetch(endpoint).then(res => res.json()).then((resp) => {
        const { data } = resp
        return data
    }).catch((error) => {
        return false
    })

    return data
}

export default getCovidData