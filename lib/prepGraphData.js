const parseDataSet = (args) => {
    const { dataSet, config, key } = args
    const data = [];

    dataSet.forEach((dataPoint) => {
        data.push([dataPoint.date, dataPoint[key]]);
    });

    data.push(config);
    return data.reverse();
};

export default parseDataSet;
