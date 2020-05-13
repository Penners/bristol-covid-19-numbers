import Chart from "react-google-charts";
import prepGraphData from "../lib/prepGraphData";

const graph = (props) => {
  const data = prepGraphData(
    props.dataSet,
    ["", "Daily Cases"],
    props.totalCases
  );
  const options = {
    chart: {},
    animation: {
      startup: true,
      duration: 1,
    },
    legend: { position: "none" },
  };
  return (
    <React.Fragment>
      <div className="aspect-ratio-box">
        <div className="aspect-ratio-box-inside">
          <Chart
            width={"100%"}
            height={"100%"}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
          />
        </div>
      </div>
      <style jsx>{`
        .aspect-ratio-box {
          height: 0;
          overflow: hidden;
          padding-top: calc(1080 / 1920 * 100%);
          background: white;
          position: relative;
        }
        .aspect-ratio-box-inside {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </React.Fragment>
  );
};

export default graph;
