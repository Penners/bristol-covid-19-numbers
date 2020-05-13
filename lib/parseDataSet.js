const parseDataSet = (dataSet) => {
  let x = [];
  let y = [];

  dataSet.forEach((element) => {
    x.push(element.date);
    y.push(element.value);
  });

  return { x: x, y: y };
};

export default parseDataSet;
