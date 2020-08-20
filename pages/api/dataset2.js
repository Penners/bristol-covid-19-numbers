import parseData from "../../lib/parseData";

export default (req, res) => {
  return new Promise((resolve) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaName=Bristol,%2520City%2520of&structure=%7B%22date%22:%22date%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22,%22cumCasesBySpecimenDate%22:%22cumCasesBySpecimenDate%22%7D",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
        res.status(200).json(parseData(result));
        return resolve();
      })
      .catch((error) => {
        console.log("error", error);
        res.status(400).json({ message: "data source error" });
        return resolve();
      });
  });
};
