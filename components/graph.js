import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import parseDataSet from "../lib/parseDataSet";
const graph = (props) => {
  const data = [
    {
      ...parseDataSet(props.dataset),
      ...props.data,
    },
  ];

  console.log(data);
  return (
    <div>
      <Plot data={data} layout={props.layout} />
    </div>
  );
};

export default graph;
