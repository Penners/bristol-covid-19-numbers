import parseData from "../../lib/parseData";

export default (req, res) => {
  return new Promise((resolve) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://c19downloads.azureedge.net/downloads/data/utlas_latest.json",
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
