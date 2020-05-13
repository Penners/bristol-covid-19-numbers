const parseDataSet = (dataSet, config, totalCases = false) => {
  let data = [];

  const dataType = totalCases ? "totalCases" : "dailyCases";

  dataSet.forEach((element) => {
    data.push([element.dateFormat, element[dataType]]);
  });

  data.push(config);
  return data.reverse();
};

export default parseDataSet;
